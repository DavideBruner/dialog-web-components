```jsx
initialState = {
  avatar: null,
  placeholder: 'empty',
  name: 'Daredevil',
};

const onChange = (avatar) => {
  setState({ avatar });
};

<AvatarSelector
  {...state}
  onChange={onChange}
  onRemove={() => setState({ avatar: null })}
  size={140}
/>;
```

AvatarSelector with only .jpeg and .png file types:

```jsx
initialState = {
  avatar: null,
  placeholder: 'empty',
  name: 'Daredevil',
};

const onChange = (avatar) => {
  setState({ avatar });
};

<AvatarSelector
  {...state}
  onChange={onChange}
  onRemove={() => setState({ avatar: null })}
  size={140}
  mimeTypes={['image/jpeg', 'image/png']}
/>;
```
