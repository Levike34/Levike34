const quotes = ['Just decide; what\'s it\'s gonna be, who you\'re gonna be and how your gonna do it, and then from that point, the universe will get out of your way. -Will Smith', 'Nobody can make you feel inferior without your consent. - Eleanor Roosevelt', 'A life spent making mistakes is not only more honorable, but more useful than a life spent doing nothing. - George Bernard Shaw'];
class Quoter extends React.Component {constructor(props) {
    super(props);
    this.state = {
      input: quotes[Math.floor(Math.random() * quotes.length)] };

    this.quoteGetter = this.quoteGetter.bind(this);
  }

  quoteGetter() {
    this.setState({
      input: quotes[Math.floor(Math.random() * quotes.length)] });


  }

  render() {
    const auth = this.state.input.split('-').pop();
    return /*#__PURE__*/(
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h1", { id: "text" }, this.state.input.replace(auth, "")), /*#__PURE__*/
      React.createElement("p", { id: "author" }, auth), /*#__PURE__*/
      React.createElement("button", { id: "new-quote", onClick: this.quoteGetter }, "New Quote"), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/
      React.createElement("button", null, /*#__PURE__*/React.createElement("a", { id: "tweet-quote", href: "https://twitter.com/intent/tweet/?text=", target: "#" }, "Tweet"))));


  }}
;

ReactDOM.render( /*#__PURE__*/React.createElement(Quoter, null), document.getElementById('quote-box'));