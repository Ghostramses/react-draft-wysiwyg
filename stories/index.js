import React from 'react';
import { storiesOf } from '@storybook/react';
import Basic from './Basic';
import BasicControlled from './BasicControlled';
import BasicContentState from './BasicContentState';
import ReadOnly from './ReadOnly';
import SpellCheck from './SpellCheck';
import HashTag from './HashTag';
import Mention from './Mention';
import I18n from './I18n';
import ToolbarHidden from './ToolbarHidden';
import ImageUpload from './ImageUpload';
import Embeddable from './Embeddable';
import ImageDataURI from './ImageDataURI';
import SelectedOptions from './SelectedOptions';
import ControlledSelectedOptions from './ControlledSelectedOptions';
import FloatingToolbar from './FloatingToolbar';
import CustomToolbar from './CustomToolbar';
import ConvertToHTML from './ConvertToHTML';
import ConvertFromHTML from './ConvertFromHTML';
import ConvertToMarkdown from './ConvertToMarkdown';
import FocusBlurCallbacks from './FocusBlurCallbacks';
import ConvertFromRawDraftContent from './ConvertFromRawDraftContent';
import ConvertToRawDraftContent from './ConvertToRawDraftContent';
import DynamicDecorators from './DynamicDecorators';

import './styles.css';

storiesOf('Basic - uncontrolled', module).add('story', () => <Basic />);
storiesOf('Basic - controlled', module).add('story', () => <BasicControlled />);
storiesOf('Basic - content state', module).add('story', () => (
  <BasicContentState />
));
storiesOf('ReadOnly', module).add('story', () => <ReadOnly />);
storiesOf('SpellCheck', module).add('story', () => <SpellCheck />);
storiesOf('I18n', module).add('story', () => <I18n />);
storiesOf('ToolbarHidden', module).add('story', () => <ToolbarHidden />);
storiesOf('FocusBlurCallbacks', module).add('story', () => (
  <FocusBlurCallbacks />
));
storiesOf('HashTag', module).add('story', () => <HashTag />);
storiesOf('Mention', module).add('story', () => <Mention />);
storiesOf('SelectedOptions', module)
  .add('uncontrolled', () => <SelectedOptions />)
  .add('controlled', () => <ControlledSelectedOptions />);
storiesOf('CustomToolbar', module).add('story', () => <CustomToolbar />);
storiesOf('FloatingToolbar', module).add('story', () => <FloatingToolbar />);
storiesOf('ImageUpload and Alt attribute', module).add('story', () => (
  <ImageUpload />
));
storiesOf('Image as data URI and preview', module).add('story', () => (
  <ImageDataURI />
));
storiesOf('Embeddable with Callback', module).add('story', () => (
  <Embeddable />
));
storiesOf('ConvertFromRawDraftContent', module).add('story', () => (
  <ConvertFromRawDraftContent />
));
storiesOf('ConvertToRawDraftContent', module).add('story', () => (
  <ConvertToRawDraftContent />
));
storiesOf('ConvertToHTML', module).add('story', () => <ConvertToHTML />);
storiesOf('ConvertFromHTML', module).add('story', () => <ConvertFromHTML />);
storiesOf('ConvertToMarkdown', module).add('story', () => (
  <ConvertToMarkdown />
));
storiesOf('DynamicDecorators', module).add('story', () => (
  <DynamicDecorators />
));
