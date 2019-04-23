```jsx
const { PeerInfoSelectorState } = require('../../entities');
const contacts = require('../../fixtures/contacts.json');

const initial = {
  isOpen: false,
  step: 'type',
  request: {
    type: 'group',
    title: '',
    shortname: '',
    about: '',
    avatar: null,
    members: PeerInfoSelectorState.create(contacts),
    isUsersVisible: false,
  },
};
initialState = initial;

const handleOpen = () => setState({ isOpen: true });
const handleClose = () => setState(initial);
const handleRequestChange = (request) => setState({ request });
const handleChangeIsUsersVisible = (isUsersVisible) =>
  setState({ request: { ...state.request, isUsersVisible } });
const handleStepChange = (step) => setState({ step });
const handleSubmit = (request) => {
  console.log(request);
  setState(initial);
};

<div>
  <Button theme="primary" onClick={handleOpen}>
    Create new
  </Button>
  {state.isOpen ? (
    <CreateNewModal
      isOpen={state.isOpen}
      step={state.step}
      request={state.request}
      shortnamePrefix="https://dlg.im/@"
      onClose={handleClose}
      maxGroupSize={4}
      onRequestChange={handleRequestChange}
      onStepChange={handleStepChange}
      onChangeIsUsersVisible={handleChangeIsUsersVisible}
      onSubmit={handleSubmit}
    />
  ) : null}
</div>;
```
