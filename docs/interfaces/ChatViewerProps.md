[**Chat Viewer**](../README.md)

***

# Interface: ChatViewerProps\<M\>

Defined in: [lib/types.ts:100](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L100)

Props for the ChatViewer component.

## Type Parameters

### M

`M` *extends* [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md) = [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md)

The message type, which must extend [IdentifiableMessage](../type-aliases/IdentifiableMessage.md).

## Properties

### alignment?

> `optional` **alignment**: [`ChatAlignment`](../type-aliases/ChatAlignment.md)

Defined in: [lib/types.ts:125](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L125)

Alignment of the chat list. Determines whether new messages appear at the top or bottom.

#### Default Value

```ts
'bottom'
```

***

### className?

> `optional` **className**: `string`

Defined in: [lib/types.ts:110](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L110)

Class name for the root element of the chat viewer.

***

### historyEndOffset?

> `optional` **historyEndOffset**: `number`

Defined in: [lib/types.ts:187](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L187)

Offset in pixels from the end of the history at which to trigger [onHistoryEndReached](#onhistoryendreached).

#### Default Value

```ts
10
```

***

### keepMountedIds?

> `optional` **keepMountedIds**: [`MessageId`](../type-aliases/MessageId.md)\<`M`\>[]

Defined in: [lib/types.ts:148](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L148)

[MessageId](../type-aliases/MessageId.md)s of messages to keep mounted even when out of view.

***

### keepMountedIndexes?

> `optional` **keepMountedIndexes**: `number`[]

Defined in: [lib/types.ts:144](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L144)

Indexes of messages to keep mounted even when out of view.
This allows you to preserve the state of messages that are not currently visible.

***

### messages

> **messages**: `M`[]

Defined in: [lib/types.ts:153](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L153)

The array of messages to display in the chat viewer.

***

### onAtBottom?

> `optional` **onAtBottom**: [`ChatCallback`](../type-aliases/ChatCallback.md)\<`M`\>

Defined in: [lib/types.ts:244](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L244)

Callback fired when the viewport reaches the bottom of the message list.

#### Param

[ChatViewerHandle](ChatViewerHandle.md) instance. Allows you to control the chat viewer.

***

### onAtTop?

> `optional` **onAtTop**: [`ChatCallback`](../type-aliases/ChatCallback.md)\<`M`\>

Defined in: [lib/types.ts:238](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L238)

Callback fired when the viewport reaches the top of the message list.

#### Param

[ChatViewerHandle](ChatViewerHandle.md) instance. Allows you to control the chat viewer.

***

### onHistoryEndReached?

> `optional` **onHistoryEndReached**: [`ChatCallback`](../type-aliases/ChatCallback.md)\<`M`\>

Defined in: [lib/types.ts:181](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L181)

Callback fired when the user scrolls to the end of the history (top or bottom, depending on alignment).

#### Param

[ChatViewerHandle](ChatViewerHandle.md) instance. Allows you to control the chat viewer.

***

### onKeyDown?

> `optional` **onKeyDown**: `KeyboardEventHandler`

Defined in: [lib/types.ts:206](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L206)

Callback fired on key down events in the scrollable container.

***

### onNewerMessages?

> `optional` **onNewerMessages**: [`OnMessagesCallback`](../type-aliases/OnMessagesCallback.md)\<`M`\>

Defined in: [lib/types.ts:232](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L232)

Callback fired when newer messages are requested (e.g., user scrolls to the bottom).

#### Example

You might want to use this callback with utility functions like [followEveryMessage](../functions/followEveryMessage.md), [followMessagesAtBottom](../functions/followMessagesAtBottom.md), or [followMessagesBy](../functions/followMessagesBy.md) to automatically scroll to automatically follow new messages.

```tsx
<ChatViewer
  messages={messages}
  renderMessage={renderMessage}
  onNewerMessages={followMessagesAtBottom()}
/>
```

#### Param

[ChatViewerHandle](ChatViewerHandle.md) instance. Allows you to control the chat viewer.

#### Param

The current messages.

#### Default Value

[followMessagesAtBottom](../functions/followMessagesAtBottom.md) - scrolls to the bottom when viewport is at the bottom of the history.

***

### onOlderMessages?

> `optional` **onOlderMessages**: [`OnMessagesCallback`](../type-aliases/OnMessagesCallback.md)\<`M`\>

Defined in: [lib/types.ts:213](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L213)

Callback fired when older messages are requested (e.g., user scrolls to the top).

#### Param

[ChatViewerHandle](ChatViewerHandle.md) instance. Allows you to control the chat viewer.

#### Param

The current messages.

***

### onPrefixDisplay?

> `optional` **onPrefixDisplay**: [`OnAffixCallback`](../type-aliases/OnAffixCallback.md)\<`M`\>

Defined in: [lib/types.ts:251](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L251)

Callback fired when the prefix node is displayed in the viewport.

#### Param

[ChatViewerHandle](ChatViewerHandle.md) instance. Allows you to control the chat viewer.

#### Param

Whether the prefix is displayed.

***

### onScroll()?

> `optional` **onScroll**: (`offset`) => `void`

Defined in: [lib/types.ts:194](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L194)

Callback fired on scroll with the current scroll offset.

#### Parameters

##### offset

`number`

The current scroll offset.

#### Returns

`void`

***

### onScrollEnd()?

> `optional` **onScrollEnd**: () => `void`

Defined in: [lib/types.ts:198](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L198)

Callback fired when scrolling ends.

#### Returns

`void`

***

### onSuffixDisplay?

> `optional` **onSuffixDisplay**: [`OnAffixCallback`](../type-aliases/OnAffixCallback.md)\<`M`\>

Defined in: [lib/types.ts:259](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L259)

Callback fired when the suffix node is displayed in the viewport.

#### Param

[ChatViewerHandle](ChatViewerHandle.md) instance. Allows you to control the chat viewer.

#### Param

Whether the suffix is displayed.

#### Default Value

[followSuffixAtBottom](../functions/followSuffixAtBottom.md) - scrolls to the bottom when viewport when suffix is displayed at the bottom of the history.

***

### onWheel?

> `optional` **onWheel**: `WheelEventHandler`

Defined in: [lib/types.ts:202](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L202)

Callback fired on wheel events in the scrollable container.

***

### overscan?

> `optional` **overscan**: `number`

Defined in: [lib/types.ts:132](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L132)

Number of extra items to render beyond the visible area (for virtualization performance).
Passed to Virtua's `overscan` prop.

#### See

https://github.com/inokawa/virtua/blob/main/docs/react/interfaces/VListProps.md#overscan

***

### prefix?

> `optional` **prefix**: `ReactNode`

Defined in: [lib/types.ts:167](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L167)

React node to render before the message list (e.g., a header or history loader).
It can be conditionally displayed. When changed, it will trigger a [onPrefixDisplay](#onprefixdisplay) callback.

#### Default Value

```ts
null
```

***

### renderMessage()

> **renderMessage**: (`message`) => `null` \| `ReactElement`\<`unknown`, `string` \| `JSXElementConstructor`\<`any`\>\>

Defined in: [lib/types.ts:160](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L160)

Function to render a message.

#### Parameters

##### message

`M`

The message to render.

#### Returns

`null` \| `ReactElement`\<`unknown`, `string` \| `JSXElementConstructor`\<`any`\>\>

A React element or null.

***

### scrollerClassName?

> `optional` **scrollerClassName**: `string`

Defined in: [lib/types.ts:118](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L118)

Class name for the scrollable container.

***

### scrollerStyle?

> `optional` **scrollerStyle**: `CSSProperties`

Defined in: [lib/types.ts:114](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L114)

Style for the scrollable container.

***

### ssrCount?

> `optional` **ssrCount**: `number`

Defined in: [lib/types.ts:138](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L138)

Number of items to render on the server for SSR. Passed to Virtua's `ssrCount` prop.

#### See

https://github.com/inokawa/virtua/blob/main/docs/react/interfaces/VListProps.md#ssrcount

***

### style?

> `optional` **style**: `CSSProperties`

Defined in: [lib/types.ts:106](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L106)

Style for the root element of the chat viewer.

***

### suffix?

> `optional` **suffix**: `ReactNode`

Defined in: [lib/types.ts:174](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L174)

React node to render after the message list (e.g., a footer or typing indicator).
It can be conditionally displayed. When changed, it will trigger a [onSuffixDisplay](#onsuffixdisplay) callback.

#### Default Value

```ts
null
```
