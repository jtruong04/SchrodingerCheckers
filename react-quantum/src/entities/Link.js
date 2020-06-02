class Link {
  constructor() {
    this.linkID = Link.count;
    this.state = true;
    Link.count++;
  }
}

export default Link;
