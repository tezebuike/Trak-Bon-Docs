import React, { Component } from 'react';
import { Grid, Cell, FABButton, Icon, Textfield, IconButton } from 'react-mdl';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import * as documentActions from '../actions/documentActions'
import Dashboard from '../components/documentComponents/Dashboard';
import { isAdmin } from '../utils/Utils';

class DashboardPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: '',
      documents: Object.assign({}, props.allDocuments)
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.clearSearch = this.clearSearch.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.search !== this.props.search ||
      this.props.allDocuments !== nextProps.allDocuments) {
        const documents = nextProps.search.totalItems > 0 ?
          nextProps.search : nextProps.allDocuments;

      this.setState({ documents: Object.assign({}, documents) });
    }
  }

  onChange(event) {
    this.setState({ searchTerm: event.target.value });
  }

  onSubmit(event) {
    event.preventDefault();
    const term = this.state.searchTerm;
    this.props.actions.searchDocuments(term);
  }

  clearSearch() {
    this.setState({
      searchTerm: '',
      documents: Object.assign({}, this.props.allDocuments)
    });
  }

  componentWillMount() {
    this.props.actions.fetchDocuments();
  }

  render() {
    const documents = this.state.documents;
    return (
      <div>
        {this.props.auth.isAuthenticated ?
        <Grid>
          <Cell col={2}>
            <span />
          </Cell>
          <Cell col={9}>
            {/*{isAdmin ?*/}
            <div>
              <form method="post" onSubmit={this.onSubmit}>
                <span>
                <Textfield
                  onChange={this.onChange}
                  label="Search"
                  name="search"
                  floatingLabel
                  value={this.state.searchTerm}
                  style={{ width: '500px' }}
                />
                <Icon name="close"
                onClick={this.clearSearch} />
                </span>
              </form>
              { documents ?
              <Dashboard
              allDocuments={documents}
              auth={this.props.auth}
              actions={this.props.actions}
              />
              : <span/>
              }
            </div>
            {/*: <span/>
            }*/}
          </Cell>
          <Cell col={1}>
            <Link to="/editor">
              <FABButton colored ripple>
                <Icon name="add" />
              </FABButton>
            </Link>
          </Cell>
        </Grid>
        : <h4> You are not authorised to access this page, Please log in </h4>
            }
      </div>
    );
  }
}

DashboardPage.propTypes = {
  actions: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  allDocuments: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  console.log('state', state);
  return {
    auth: state.auth,
    allDocuments: state.documents,
    search : state.search.documents || []
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: bindActionCreators(documentActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DashboardPage);
