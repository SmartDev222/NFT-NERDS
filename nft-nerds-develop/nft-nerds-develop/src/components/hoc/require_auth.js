import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from'prop-types';

export default function (ComposedComponent) {
  class Authentication extends Component {
    componentWillMount() {
      console.log("-------- will mount ");
      console.log(localStorage.getItem('authenticated'));
      if(!localStorage.getItem('authenticated')) {
        console.log("******** signin ")
        this.props.history.push('/signin');
      }
    }

    componentWillUpdate(nextProps) {
      console.log("-------- will update ");
      console.log(localStorage.getItem('authenticated'));
      if(!localStorage.getItem('authenticated')) {
        console.log("******** signin update")
        this.props.history.push('/signin');
      }
    }

    PropTypes = {
      router: PropTypes.object,
    }

    render () {
      return <ComposedComponent {...this.props} />;
    }
  }
  function mapStateToProps(state) {
    return { authenticated: state.authenticated };
  }
  return connect(mapStateToProps)(Authentication);
}
