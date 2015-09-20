/*
Mixins are just objects with properties that are merged with the compoent
they are included in.

See: http://facebook.github.io/react/docs/reusable-components.html#mixins
*/
var MyMixin = {
  queryHashtagApi: function (url, options, successCallback) {
    console.log(options);
    $.get(url, options, function(result) {
      successCallback(result);
   });
  },

  // This does not overwrite the components
  // `componentWillUnmount` method but will
  // be called along side it.
  componentWillUnmount: function () {
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
         hashtags:[],
         initialPosition: 'unknown',
         lastPosition: 'unknown'
       };
  },
  getDefaultProps: function () {
    return {
      prefix: 'Hello'
    };
  },

  componentWillMount: function () {

    // Here you could setState, fetch data from a server or something else...
    this.queryHashtagApi('http://localhost:1337/hashtag', this.state.initialPosition , function (data) {
      this.setState({ hashtags: data.posts });
    }.bind(this));
  },

  componentDidMount: function () {
    navigator.geolocation.getCurrentPosition(
      (initialPosition) => this.setState({initialPosition}),
      (error) => alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
    );
    this.watchID = navigator.geolocation.watchPosition((lastPosition) => {
     this.setState({lastPosition});
   });
    // ... or to component references:
  },

  componentWillUpdate: function () {
    console.log('component about to update!');
  },

  componentDidUpdate: function () {
    console.log(this.state.initialPosition);
    console.log('component updated!');
    // DOM is available here...
  },

  componentWillUnmount: function () {
    // Use this to tear down any event listeners
    // or do other cleanup before the compoennt is
    // destroyed.
    navigator.geolocation.clearWatch(this.watchID);
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

      return <a style={divStyle} href={tag.link} className={classes} target="blank" key={index}>
        <div className={contentClasses}><span className="tag-author">@{tag.author}</span><br/><span className="tag-message">{tag.message}</span></div>
      </a>;
    });

    return (
      <div>
        {hashtags}
        <a href="" onClick={this.toggle} >Toggle</a>
    </div>
    );
  }
});
React.render(
  <HashtagsApp />,
  document.getElementById('hashtags-container')
);
