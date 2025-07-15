[**API Reference**](../README.md)

***

# Interface: ChatViewerProps\<M\>

Defined in: [lib/types.ts:100](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L100)

Props for the ChatViewer component.

## Type Parameters

### M

`M` *extends* [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md) = [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md)

The message type, which must extend [IdentifiableMessage](../type-aliases/IdentifiableMessage.md).

## Properties

### alignment?

> `optional` **alignment**: [`ChatAlignment`](../type-aliases/ChatAlignment.md)

Defined in: [lib/types.ts:125](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L125)

Alignment of the chat list. Determines whether new messages appear at the top or bottom.

#### Default Value

```ts
'bottom'
```

***

### className?

> `optional` **className**: `string`

Defined in: [lib/types.ts:110](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L110)

Class name for the root element of the chat viewer.

***

### historyEndOffset?

> `optional` **historyEndOffset**: `number`

Defined in: [lib/types.ts:179](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L179)

Offset in pixels from the end of the history at which to trigger [onHistoryEndReached](#onhistoryendreached).

***

### keepMountedIds?

> `optional` **keepMountedIds**: [`MessageId`](../type-aliases/MessageId.md)\<`M`\>[]

Defined in: [lib/types.ts:148](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L148)

[MessageId](../type-aliases/MessageId.md)s of messages to keep mounted even when out of view.

***

### keepMountedIndexes?

> `optional` **keepMountedIndexes**: `number`[]

Defined in: [lib/types.ts:144](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L144)

Indexes of messages to keep mounted even when out of view.
This allows you to preserve the state of messages that are not currently visible.

***

### messages

> **messages**: `M`[]

Defined in: [lib/types.ts:153](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L153)

The array of messages to display in the chat viewer.

***

### onAtBottom?

> `optional` **onAtBottom**: [`ChatCallback`](../type-aliases/ChatCallback.md)\<`M`\>

Defined in: [lib/types.ts:219](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L219)

Callback fired when the viewport reaches the bottom of the message list.

#### Param

[ChatViewerHandle](ChatViewerHandle.md) instance. Allows you to control the chat viewer.

***

### onAtTop?

> `optional` **onAtTop**: [`ChatCallback`](../type-aliases/ChatCallback.md)\<`M`\>

Defined in: [lib/types.ts:214](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L214)

Callback fired when the viewport reaches the top of the message list.

#### Param

[ChatViewerHandle](ChatViewerHandle.md) instance. Allows you to control the chat viewer.

***

### onHistoryEndReached?

> `optional` **onHistoryEndReached**: [`ChatCallback`](../type-aliases/ChatCallback.md)\<`M`\>

Defined in: [lib/types.ts:175](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L175)

Callback fired when the user scrolls to the end of the history (top or bottom, depending on alignment).

#### Param

[ChatViewerHandle](ChatViewerHandle.md) instance. Allows you to control the chat viewer.

***

### onKeyDown?

> `optional` **onKeyDown**: `KeyboardEventHandler`

Defined in: [lib/types.ts:197](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L197)

Callback fired on key down events in the scrollable container.

***

### onNewerMessages?

> `optional` **onNewerMessages**: [`OnMessagesCallback`](../type-aliases/OnMessagesCallback.md)\<`M`\>

Defined in: [lib/types.ts:209](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L209)

Callback fired when newer messages are requested (e.g., user scrolls to the bottom).

#### Param

[ChatViewerHandle](ChatViewerHandle.md) instance. Allows you to control the chat viewer.

#### Param

The current messages.

***

### onOlderMessages?

> `optional` **onOlderMessages**: [`OnMessagesCallback`](../type-aliases/OnMessagesCallback.md)\<`M`\>

Defined in: [lib/types.ts:203](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L203)

Callback fired when older messages are requested (e.g., user scrolls to the top).

#### Param

[ChatViewerHandle](ChatViewerHandle.md) instance. Allows you to control the chat viewer.

#### Param

The current messages.

***

### onPrefixDisplay?

> `optional` **onPrefixDisplay**: [`OnAffixCallback`](../type-aliases/OnAffixCallback.md)\<`M`\>

Defined in: [lib/types.ts:225](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L225)

Callback fired when the prefix node is displayed in the viewport.

#### Param

[ChatViewerHandle](ChatViewerHandle.md) instance. Allows you to control the chat viewer.

#### Param

Whether the prefix is displayed.

***

### onScroll()?

> `optional` **onScroll**: (`offset`) => `void`

Defined in: [lib/types.ts:185](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L185)

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

Defined in: [lib/types.ts:189](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L189)

Callback fired when scrolling ends.

#### Returns

`void`

***

### onSuffixDisplay?

> `optional` **onSuffixDisplay**: [`OnAffixCallback`](../type-aliases/OnAffixCallback.md)\<`M`\>

Defined in: [lib/types.ts:231](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L231)

Callback fired when the suffix node is displayed in the viewport.

#### Param

[ChatViewerHandle](ChatViewerHandle.md) instance. Allows you to control the chat viewer.

#### Param

Whether the suffix is displayed.

***

### onWheel?

> `optional` **onWheel**: `WheelEventHandler`

Defined in: [lib/types.ts:193](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L193)

Callback fired on wheel events in the scrollable container.

***

### overscan?

> `optional` **overscan**: `number`

Defined in: [lib/types.ts:132](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L132)

Number of extra items to render beyond the visible area (for virtualization performance).
Passed to Virtua's `overscan` prop.

#### See

https://github.com/inokawa/virtua/blob/main/docs/react/interfaces/VListProps.md#overscan

***

### prefix?

> `optional` **prefix**: `ReactNode`

Defined in: [lib/types.ts:164](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L164)

React node to render before the message list (e.g., a header or loader).
It can be conditionally displayed. When changed, it will trigger a [onPrefixDisplay](#onprefixdisplay) callback.

***

### renderMessage()

> **renderMessage**: (`message`) => `null` \| `ReactElement`\<`unknown`, `string` \| `JSXElementConstructor`\<`any`\>\>

Defined in: [lib/types.ts:159](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L159)

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

Defined in: [lib/types.ts:118](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L118)

Class name for the scrollable container.

***

### scrollerStyle?

> `optional` **scrollerStyle**: `CSSProperties`

Defined in: [lib/types.ts:114](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L114)

Style for the scrollable container.

***

### ssrCount?

> `optional` **ssrCount**: `number`

Defined in: [lib/types.ts:138](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L138)

Number of items to render on the server for SSR. Passed to Virtua's `ssrCount` prop.

#### See

https://github.com/inokawa/virtua/blob/main/docs/react/interfaces/VListProps.md#ssrcount

***

### style?

> `optional` **style**: `CSSProperties`

Defined in: [lib/types.ts:106](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L106)

Style for the root element of the chat viewer.

***

### suffix?

> `optional` **suffix**: `ReactNode`

Defined in: [lib/types.ts:169](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L169)

React node to render after the message list (e.g., a footer or loader).
It can be conditionally displayed. When changed, it will trigger a [onSuffixDisplay](#onsuffixdisplay) callback.
