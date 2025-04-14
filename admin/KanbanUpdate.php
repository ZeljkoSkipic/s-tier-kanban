<?php

class KanbanUpdate
{

    public static function init()
    {
        add_action('admin_menu', [self::class, 'addAdminPage']);
        add_action('admin_action_kanban-updates', [self::class, 'pluginActivate']);
        add_action('admin_init', [self::class, 'licenceCheck']);
    }

    public static function isLicenceValid()
    {
        return get_option('kanban_licence_validation') === 'valid' ? true : false;
    }

    public static function addAdminPage()
    {
        $updatePage = add_submenu_page(
            'kanban-settings',
            'License',
            'License',
            'edit_pages',
            'kanban-updates',
            [self::class, 'updatePage'],
            100
        );

        add_action("load-$updatePage", array(self::class, 'loadAdminPage'));
    }


    private static function adminNotices($type, $message)
    {

        $classes = "";

        switch ($type) {
            case 'success':
                $classes = 'notice notice-success';
                break;
            case 'error':
                $classes = 'notice notice-error';
                break;
        }


        add_action('admin_notices', function () use ($classes, $message) {
            printf('<div class="%1$s is-dismissible"><p>%2$s</p></div>', esc_attr($classes), esc_html($message));
        });
    }


    public static function updatePage()
    {
        ob_start();
        include PLUGIN_ROOT_PATH . 'admin/update-page.php';
        return ob_get_contents();
    }

    public static function loadAdminPage()

    {

        if (isset($_POST['kanban-licence-security']) && wp_verify_nonce($_POST['kanban-licence-security'], 'kanban-licence-key')) {
            if (isset($_POST['activate'])) {
                $licenceKey = isset($_POST['kanban-pro-licence']) && $_POST['kanban-pro-licence'] ? wp_strip_all_tags($_POST['kanban-pro-licence']) : "";
                if ($licenceKey) {
                    self::pluginActivate($licenceKey);
                }
            } else {
                self::deactivateLicence();
            }
        }
    }

    public static function licenceCheck()
    {

        if (!self::licenceCheckRequest(false, false)) {
            self::deactivateLicence();
        }

        else {
            self::resetTransient();
        }
    }

    private static function domainCheck($licence)
    {
        $data = [
            'licence'       => base64_decode($licence),
            'siteUrl'       => get_site_url()
        ];

        $url = "https://kanbanplugin.com/wp-json/kanban-plugin/v1/domainCheck";

        $response = wp_remote_post($url, [
            'method'    => 'POST',
            'body'      => $data
        ]);

        if (!is_wp_error($response)) {
            $body = json_decode(wp_remote_retrieve_body($response), true);

            if (isset($body['success']) && $body['success'] == true) {
                return $body['data']['status'] == 'active' ? true : false;
            }
        }

        return true;
    }

    private static function licenceCheckRequest($force = false, $skipDomainCheck = true)
    {

        $licence = get_option('kanban_licence_key');

        if (!$licence) {
            self::resetLicence();
        }

        if ((!get_transient('kanban_check_licence') || $force) && $licence) {

            if (!$skipDomainCheck) {

                if (!self::domainCheck($licence)) {
                    return false;
                }
            }

            $data = [
                'licence'       => base64_decode($licence),
                'siteUrl'       => get_site_url()
            ];

            $url = "https://kanbanplugin.com/wp-json/kanban-plugin/v1/licenceCheck";

            $response = wp_remote_post($url, [
                'method'    => 'POST',
                'body'      => $data
            ]);

            if (!is_wp_error($response)) {
                $body = json_decode(wp_remote_retrieve_body($response), true);

                if (isset($body['success']) && $body['success'] == true) {
                    return $body['data']['status'] == 'active' ? true : false;
                }
            }
        }

        return true;
    }

    private static function resetLicence()
    {
        delete_option('kanban_licence_key');
        delete_option('kanban_licence_validation');
        delete_transient('kanban_check_licence', true, 15 * MINUTE_IN_SECONDS);
    }

    private static function resetTransient() {
        set_transient('kanban_check_licence', true, 15 * MINUTE_IN_SECONDS);
    }

    private static function deactivateLicence()
    {
        self::deleteSiteDomain();
        self::resetLicence();
    }

    private static function deleteSiteDomain()
    {

        $licence = get_option('kanban_licence_key');

        $data = [
            'licence'       => base64_decode($licence),
            'siteUrl'       => get_site_url()
        ];

        $url = "https://kanbanplugin.com/wp-json/kanban-plugin/v1/siteDeactivate";

        wp_remote_post($url, [
            'method'    => 'POST',
            'body'      => $data
        ]);
    }

    public static function pluginActivate(string $licenceKey)
    {

        $data = [
            'licence'       => $licenceKey,
            'siteUrl'       => get_site_url()
        ];

        $url = "https://kanbanplugin.com/wp-json/kanban-plugin/v1/licenceCheck";

        $response = wp_remote_post($url, [
            'method'    => 'POST',
            'body'      => $data
        ]);


        if (!is_wp_error($response)) {
            $body = json_decode(wp_remote_retrieve_body($response), true);

            if (isset($body['success']) && $body['success'] == true && $body['data']['status'] === 'active') {
                self::adminNotices('success', 'The plugin has been successfully activated.');
                update_option('kanban_licence_key', base64_encode($licenceKey));
                update_option('kanban_licence_validation', 'valid');
                self::resetTransient();
            } else {

                self::adminNotices('error', 'The key is incorrect or has expired.');
            }
        } else {
            $error_message = $response->get_error_message();
            throw new Exception($error_message);
        }
    }
}
