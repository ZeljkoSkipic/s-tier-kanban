class DefaultBlock {
  
  render() {
    return document.createElement('span');
  }

  save(blockContent) {
    return "";
  }

  static get isReadOnlySupported() {
    return true;
  }
}
