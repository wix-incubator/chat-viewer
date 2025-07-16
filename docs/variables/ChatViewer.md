[**API Reference**](../README.md)

***

# Variable: ChatViewer()

> `const` **ChatViewer**: \<`M`\>(`props`) => `ReactElement`

Defined in: [lib/chat-viewer.tsx:377](https://github.com/wix-incubator/chat-viewer/blob/2fbf016d3c8ddf9c67df1f283a6f305bdb2c2dc5/lib/chat-viewer.tsx#L377)

ChatViewer component that implements a virtualized chat viewer.
It supports features like prefix and suffix rendering,
scrolling to specific messages, and tracking seen messages.

## Type Parameters

### M

`M` *extends* [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md)

Type of messages, which must extend [IdentifiableMessage](../type-aliases/IdentifiableMessage.md). It can be any type that has an `id` property for unique identifying messages.

## Parameters

### props

[ChatViewerProps](../interfaces/ChatViewerProps.md) properties for the component and `ref` that will expose [ChatViewerHandle](../interfaces/ChatViewerHandle.md)'s methods.

#### alignment?

[`ChatAlignment`](../type-aliases/ChatAlignment.md)

Alignment of the chat list. Determines whether new messages appear at the top or bottom.

**Default Value**

```ts
'bottom'
```

#### className?

`string`

Class name for the root element of the chat viewer.

#### historyEndOffset?

`number`

Offset in pixels from the end of the history at which to trigger [onHistoryEndReached](../interfaces/ChatViewerProps.md#onhistoryendreached).

**Default Value**

```ts
10
```

#### keepMountedIds?

[`MessageId`](../type-aliases/MessageId.md)\<`M`\>[]

[MessageId](../type-aliases/MessageId.md)s of messages to keep mounted even when out of view.

#### keepMountedIndexes?

`number`[]

Indexes of messages to keep mounted even when out of view.
This allows you to preserve the state of messages that are not currently visible.

#### messages

`M`[]

The array of messages to display in the chat viewer.

#### onAtBottom?

[`ChatCallback`](../type-aliases/ChatCallback.md)\<`M`\>

Callback fired when the viewport reaches the bottom of the message list.

**Param**

[ChatViewerHandle](../interfaces/ChatViewerHandle.md) instance. Allows you to control the chat viewer.

#### onAtTop?

[`ChatCallback`](../type-aliases/ChatCallback.md)\<`M`\>

Callback fired when the viewport reaches the top of the message list.

**Param**

[ChatViewerHandle](../interfaces/ChatViewerHandle.md) instance. Allows you to control the chat viewer.

#### onHistoryEndReached?

[`ChatCallback`](../type-aliases/ChatCallback.md)\<`M`\>

Callback fired when the user scrolls to the end of the history (top or bottom, depending on alignment).

**Param**

[ChatViewerHandle](../interfaces/ChatViewerHandle.md) instance. Allows you to control the chat viewer.

#### onKeyDown?

`KeyboardEventHandler`

Callback fired on key down events in the scrollable container.

#### onNewerMessages?

[`OnMessagesCallback`](../type-aliases/OnMessagesCallback.md)\<`M`\>

Callback fired when newer messages are requested (e.g., user scrolls to the bottom).

**Example**

You might want to use this callback with utility functions like [followEveryMessage](../functions/followEveryMessage.md), [followMessagesAtBottom](../functions/followMessagesAtBottom.md), or [followMessagesBy](../functions/followMessagesBy.md) to automatically scroll to automatically follow new messages.

```tsx
<ChatViewer
  messages={messages}
  renderMessage={renderMessage}
  onNewerMessages={followMessagesAtBottom()}
/>
```

**Param**

[ChatViewerHandle](../interfaces/ChatViewerHandle.md) instance. Allows you to control the chat viewer.

**Param**

The current messages.

**Default Value**

[followMessagesAtBottom](../functions/followMessagesAtBottom.md) - scrolls to the bottom when viewport is at the bottom of the history.

#### onOlderMessages?

[`OnMessagesCallback`](../type-aliases/OnMessagesCallback.md)\<`M`\>

Callback fired when older messages are requested (e.g., user scrolls to the top).

**Param**

[ChatViewerHandle](../interfaces/ChatViewerHandle.md) instance. Allows you to control the chat viewer.

**Param**

The current messages.

#### onPrefixDisplay?

[`OnAffixCallback`](../type-aliases/OnAffixCallback.md)\<`M`\>

Callback fired when the prefix node is displayed in the viewport.

**Param**

[ChatViewerHandle](../interfaces/ChatViewerHandle.md) instance. Allows you to control the chat viewer.

**Param**

Whether the prefix is displayed.

#### onScroll?

(`offset`) => `void`

Callback fired on scroll with the current scroll offset.

#### onScrollEnd?

() => `void`

Callback fired when scrolling ends.

#### onSuffixDisplay?

[`OnAffixCallback`](../type-aliases/OnAffixCallback.md)\<`M`\>

Callback fired when the suffix node is displayed in the viewport.

**Param**

[ChatViewerHandle](../interfaces/ChatViewerHandle.md) instance. Allows you to control the chat viewer.

**Param**

Whether the suffix is displayed.

**Default Value**

[followSuffixAtBottom](../functions/followSuffixAtBottom.md) - scrolls to the bottom when viewport when suffix is displayed at the bottom of the history.

#### onWheel?

`WheelEventHandler`

Callback fired on wheel events in the scrollable container.

#### overscan?

`number`

Number of extra items to render beyond the visible area (for virtualization performance).
Passed to Virtua's `overscan` prop.

**See**

https://github.com/inokawa/virtua/blob/main/docs/react/interfaces/VListProps.md#overscan

#### prefix?

`ReactNode`

React node to render before the message list (e.g., a header or history loader).
It can be conditionally displayed. When changed, it will trigger a [onPrefixDisplay](../interfaces/ChatViewerProps.md#onprefixdisplay) callback.

**Default Value**

```ts
null
```

#### ref

`Ref`\<[`ChatViewerHandle`](../interfaces/ChatViewerHandle.md)\<`M`\>\>

A React ref created by `useRef` hook. It will expose [ChatViewerHandle](../interfaces/ChatViewerHandle.md) instance for imperative control over the chat viewer.

#### renderMessage

(`message`) => `null` \| `ReactElement`\<`unknown`, `string` \| `JSXElementConstructor`\<`any`\>\>

Function to render a message.

#### scrollerClassName?

`string`

Class name for the scrollable container.

#### scrollerStyle?

`CSSProperties`

Style for the scrollable container.

#### ssrCount?

`number`

Number of items to render on the server for SSR. Passed to Virtua's `ssrCount` prop.

**See**

https://github.com/inokawa/virtua/blob/main/docs/react/interfaces/VListProps.md#ssrcount

#### style?

`CSSProperties`

Style for the root element of the chat viewer.

#### suffix?

`ReactNode`

React node to render after the message list (e.g., a footer or typing indicator).
It can be conditionally displayed. When changed, it will trigger a [onSuffixDisplay](../interfaces/ChatViewerProps.md#onsuffixdisplay) callback.

**Default Value**

```ts
null
```

## Returns

`ReactElement`
