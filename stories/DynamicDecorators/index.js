/* @flow */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Editor } from '../../src';

import './styles.css';
import { EditorState } from 'draft-js';

class FindOption extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    editorState: PropTypes.object,
    setDecorators: PropTypes.func
  };
  constructor(props) {
    super(props);
    this.state = { expanded: false, searchItem: '' };
    this.doExpand = this.doExpand.bind(this);
    this.doCollapse = this.doCollapse.bind(this);
    this.onExpandEvent = this.onExpandEvent.bind(this);
    this.expandCollapse = this.expandCollapse.bind(this);
    this.renderSearchModal = this.renderSearchModal.bind(this);
    this.generateDecorator = this.generateDecorator.bind(this);
    this.findWithRegex = this.findWithRegex.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
  }

  componentDidMount() {
    const { modalHandler } = this.props;
    modalHandler.registerCallBack(this.expandCollapse);
  }

  componentWillUnmount() {
    const { modalHandler } = this.props;
    modalHandler.deregisterCallBack(this.expandCollapse);
  }

  onExpandEvent() {
    this.signalExpanded = !this.state.expanded;
  }

  expandCollapse() {
    this.setState({ expanded: this.signalExpanded });
    this.signalExpanded = false;
  }

  doExpand() {
    this.setState({ expanded: true });
  }

  doCollapse() {
    this.setState({ expanded: false });
  }

  generateDecorator(highlightTerm) {
    const regex = new RegExp(highlightTerm, 'g');
    return [
      {
        strategy: (contentBlock, callback) => {
          if (highlightTerm !== '')
            this.findWithRegex(regex, contentBlock, callback);
        },
        component: props => (
          <span {...props} style={{ backgroundColor: '#FFFF00' }}>
            {props.children}
            {console.log(props)}
          </span>
        )
      }
    ];
  }

  findWithRegex(regex, contentBlock, callback) {
    const text = contentBlock.getText();
    let matchArr, start, end;
    while ((matchArr = regex.exec(text)) !== null) {
      start = matchArr.index;
      end = start + matchArr[0].length;
      callback(start, end);
    }
  }

  onChangeSearch(e) {
    this.setState({ searchItem: e.target.value });
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (this.state.searchItem === '') this.props.setDecorators([]);
      else
        this.props.setDecorators(this.generateDecorator(this.state.searchItem));
      this.props.onChange(this.props.editorState);
    }, 300);
  }
  render() {
    const { expanded } = this.state;
    return (
      <div
        onClick={this.onExpandEvent}
        className='renderIconbar'
        aria-expanded={expanded}
        aria-haspopup='true'
      >
        <span>S</span>
        {expanded ? this.renderSearchModal() : null}
      </div>
    );
  }

  renderSearchModal() {
    return (
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute',
          top: '35px',
          right: '5px',
          display: 'flex',
          flexDirection: 'column',
          width: '235px',
          height: '150px',
          border: '1px solid #F1F1F1',
          padding: '15px',
          borderRadius: '2px',
          zIndex: '100',
          background: 'white',
          justifyContent: 'space-between',
          alignItems: 'center',
          boxShadow: '3px 3px 5px #bfbdbd'
        }}
      >
        <input
          placeholder='Buscar...'
          style={{
            width: '90%',
            height: '35px',
            margin: '10px 0 10px',
            border: '1px solid #F1F1F1',
            borderRadius: '2px',
            fontSize: '15px',
            padding: '0 5px'
          }}
          value={this.state.searchItem}
          onChange={this.onChangeSearch}
        />
      </div>
    );
  }
}
export default class DynamicDecorators extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editorState: EditorState.createEmpty(),
      baseDecorators: [{ strategy: handleMan, component: ManSpan }]
    };
    this.handleEditorState = this.handleEditorState.bind(this);
  }

  handleEditorState(editorState) {
    this.setState({ editorState });
  }

  render() {
    return (
      <Editor
        editorState={this.state.editorState}
        onEditorStateChange={this.handleEditorState}
        customDecorators={this.state.baseDecorators}
        toolbarCustomButtons={[
          <FindOption
            setDecorators={newDecorators =>
              this.setState(oldState => ({
                baseDecorators: [oldState.baseDecorators[0], ...newDecorators]
              }))
            }
          />
        ]}
      />
    );
  }
}

const findWithRegex = (regex, contentBlock, callback) => {
  const text = contentBlock.getText();
  let matchArr, start, end;
  while ((matchArr = regex.exec(text)) !== null) {
    start = matchArr.index;
    end = start + matchArr[0].length;
    callback(start, end);
  }
};

const handleMan = (contentBlock, callback, contentState) =>
  findWithRegex(/\b((m|M)an \d+)\b(\s+|$)/g, contentBlock, callback);

const ManSpan = props => (
  <span {...props} style={{ fontWeight: 'bold' }}>
    {props.children}
  </span>
);
