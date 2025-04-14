<?php
extract($email_data);
?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Task Assigned</title>
</head>

<body style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px; color: #333;">
    <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 8px; overflow: hidden;">
        <tr>
            <td style="padding: 20px;">
                <h2 style="margin-top: 0; color: #2F7AE5;">You’ve been assigned a new task</h2>

                <p>Hi <?php echo $user_name; ?>,</p>

                <p>You’ve just been assigned to the task: <strong><?php echo $task_title; ?></strong>.</p>

                <p style="text-align: center; margin: 30px 0;">
                    <a href="<?php echo $task_url . '?cardIDView=' . $task_ID; ?>" style="background-color: #17b26a; color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">View Task</a>
                </p>

            </td>
        </tr>
    </table>
</body>

</html>