/** jsx */
import React, { Component } from 'react';
import { Table, TableHeader } from 'react-mdl';
import PropTypes from 'prop-types';
import DocumentView from './DocumentView';

class DocumentList extends Component {

  render() {
    const rowData = this.props.documents.map((document) => {
      let username;
      {document.User ? username = `${document.User.firstName} ${document.User.lastName}` : username = 'Me' }
      return {
        id: document.id,
        title: <a href="#"> {document.title} </a>,
        access: document.access,
        username,
        createdAt: document.createdAt.substr(0, 10),
        action: <DocumentView document={document}/>
      };
    });

    return (
        <div>
        <Table
        sortable
        shadow={0}
        rows={rowData}
    >
        <TableHeader
            name="title"
            tooltip="Title of Document"
        >
            Document title
        </TableHeader>
        <TableHeader
            name="access"
            tooltip="Access level on Document"
        >
            Access level
        </TableHeader>
        <TableHeader
            name="username"
            tooltip="Document creation user"
        >
            Created By
        </TableHeader>
        <TableHeader
            name="createdAt"
            tooltip="Document creation date"
        >
            Published Date
        </TableHeader>
        <TableHeader
            name="action"
            tooltip="Actions you can take"
        >
            Action
        </TableHeader>
    </Table>

    </div>
    );
  }
}

DocumentList.propTypes = {
  documents: PropTypes.array.isRequired,
};

export default DocumentList;