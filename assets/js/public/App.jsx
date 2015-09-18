/*
Mixins are just objects with properties that are merged with the compoent
they are included in.

See: http://facebook.github.io/react/docs/reusable-components.html#mixins
*/
var MyMixin = {
  queryAPIorSomething: function (url, options, successCallback) {
    $.get(url, function(result) {
      successCallback(result);
   });
  },

  // This does not overwrite the components
  // `componentWillUnmount` method but will
  // be called along side it.
  componetWillUnmount: function () {
    // Abor XHR request or something else...
  }
};


var HashtagsApp = React.createClass({
  mixins: [MyMixin],

  propTypes: {


  },
  getInitialState: function () {
       return {
         showDefault: true,
         hashtags:[]
       };
  },
  getDefaultProps: function () {
    return {
      prefix: 'Hello'
    };
  },

  componentWillMount: function () {
    // Here you could setState, fetch data from a server or something else...
    this.queryAPIorSomething('http://localhost:1337/hashtag', {} , function (data) {
      this.setState({ hashtags: data.posts });
    }.bind(this));
  },

  componentDidMount: function () {
    // You now have access to the DOM:
    console.log(this.getDOMNode().html);

    // ... or to component references:
  },

  componentWillUpdate: function () {
    console.log('component about to update!');
  },

  componentDidUpdate: function () {
    console.log('component updated!');
    // DOM is available here...
  },

  componentWillUnmount: function () {
    // Use this to tear down any event listeners
    // or do other cleanup before the compoennt is
    // destroyed.
    console.log('component will unmount!');
  },

  shouldComponentUpdate: function () {
    // This is called when state/props changed and is
    // an opportunity where you can return false if
    // you don't want the component to update for
    // some reason.
    return true;
  },

  toggle: function (e) {
    // Prevent following the link.
    e.preventDefault();

    // Invert the chosen default.
    // This will trigger an intelligent re-render of the component.
    this.setState({ showDefault: !this.state.showDefault });
  },

  render: function () {
    var hashtags = _.map(this.state.hashtags, function (tag, index) {
      var classes = "col-xs-3 tag";
      var contentClasses = "tag-content";
      var divStyle = {
        backgroundImage: 'url(' + tag.picture + ')'
      };

      return <div style={divStyle} href={tag.link} className={classes} target="blank" key={index}>
        <div className={contentClasses}><span className="tag-author">@{tag.author}</span><br/><span className="tag-message">{tag.message}</span></div>
      </div>;
    });

    return (
      <div>
        {hashtags}
        <a href="" onClick={this.toggle}>Toggle</a>
    </div>
    );
  }
});
React.render(
  <HashtagsApp />,
  document.getElementById('hashtags-container')
);
