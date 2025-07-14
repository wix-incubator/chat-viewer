[**API Reference**](../README.md)

***

# Interface: ChatViewerProps\<M\>

Defined in: [types.ts:36](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L36)

## Type Parameters

### M

`M` *extends* [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md) = [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md)

## Properties

### alignment?

> `optional` **alignment**: [`ChatAlignment`](../type-aliases/ChatAlignment.md)

Defined in: [types.ts:46](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L46)

***

### className?

> `optional` **className**: `string`

Defined in: [types.ts:41](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L41)

***

### historyEndOffset?

> `optional` **historyEndOffset**: `number`

Defined in: [types.ts:62](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L62)

***

### keepMountedIds?

> `optional` **keepMountedIds**: [`MessageId`](../type-aliases/MessageId.md)\<`M`\>[]

Defined in: [types.ts:52](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L52)

***

### keepMountedIndexes?

> `optional` **keepMountedIndexes**: `number`[]

Defined in: [types.ts:51](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L51)

***

### messages

> **messages**: `M`[]

Defined in: [types.ts:55](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L55)

***

### onAtBottom?

> `optional` **onAtBottom**: [`ChatCallback`](../type-aliases/ChatCallback.md)\<`M`\>

Defined in: [types.ts:72](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L72)

***

### onAtTop?

> `optional` **onAtTop**: [`ChatCallback`](../type-aliases/ChatCallback.md)\<`M`\>

Defined in: [types.ts:71](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L71)

***

### onHistoryEndReached?

> `optional` **onHistoryEndReached**: [`ChatCallback`](../type-aliases/ChatCallback.md)\<`M`\>

Defined in: [types.ts:61](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L61)

***

### onKeyDown?

> `optional` **onKeyDown**: `KeyboardEventHandler`

Defined in: [types.ts:68](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L68)

***

### onNewerMessages?

> `optional` **onNewerMessages**: [`OnMessagesCallback`](../type-aliases/OnMessagesCallback.md)\<`M`\>

Defined in: [types.ts:70](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L70)

***

### onOlderMessages?

> `optional` **onOlderMessages**: [`OnMessagesCallback`](../type-aliases/OnMessagesCallback.md)\<`M`\>

Defined in: [types.ts:69](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L69)

***

### onPrefixDisplay?

> `optional` **onPrefixDisplay**: [`OnAffixCallback`](../type-aliases/OnAffixCallback.md)\<`M`\>

Defined in: [types.ts:73](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L73)

***

### onScroll()?

> `optional` **onScroll**: (`offset`) => `void`

Defined in: [types.ts:65](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L65)

#### Parameters

##### offset

`number`

#### Returns

`void`

***

### onScrollEnd()?

> `optional` **onScrollEnd**: () => `void`

Defined in: [types.ts:66](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L66)

#### Returns

`void`

***

### onSuffixDisplay?

> `optional` **onSuffixDisplay**: [`OnAffixCallback`](../type-aliases/OnAffixCallback.md)\<`M`\>

Defined in: [types.ts:74](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L74)

***

### onWheel?

> `optional` **onWheel**: `WheelEventHandler`

Defined in: [types.ts:67](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L67)

***

### overscan?

> `optional` **overscan**: `number`

Defined in: [types.ts:47](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L47)

***

### prefix?

> `optional` **prefix**: `ReactNode`

Defined in: [types.ts:57](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L57)

***

### renderMessage()

> **renderMessage**: (`message`) => `null` \| `ReactElement`\<`unknown`, `string` \| `JSXElementConstructor`\<`any`\>\>

Defined in: [types.ts:56](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L56)

#### Parameters

##### message

`M`

#### Returns

`null` \| `ReactElement`\<`unknown`, `string` \| `JSXElementConstructor`\<`any`\>\>

***

### scrollerClassName?

> `optional` **scrollerClassName**: `string`

Defined in: [types.ts:43](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L43)

***

### scrollerStyle?

> `optional` **scrollerStyle**: `CSSProperties`

Defined in: [types.ts:42](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L42)

***

### ssrCount?

> `optional` **ssrCount**: `number`

Defined in: [types.ts:48](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L48)

***

### style?

> `optional` **style**: `CSSProperties`

Defined in: [types.ts:40](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L40)

***

### suffix?

> `optional` **suffix**: `ReactNode`

Defined in: [types.ts:58](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L58)
