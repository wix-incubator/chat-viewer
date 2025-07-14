[**API Reference**](../README.md)

***

# Interface: ChatViewerHandle\<M\>

Defined in: [types.ts:87](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L87)

## Type Parameters

### M

`M` *extends* [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md) = [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md)

## Methods

### getIdOffset()

> **getIdOffset**(`id`): `undefined` \| `number`

Defined in: [types.ts:111](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L111)

#### Parameters

##### id

[`MessageId`](../type-aliases/MessageId.md)\<`M`\>

#### Returns

`undefined` \| `number`

***

### getIdSize()

> **getIdSize**(`id`): `undefined` \| `number`

Defined in: [types.ts:113](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L113)

#### Parameters

##### id

[`MessageId`](../type-aliases/MessageId.md)\<`M`\>

#### Returns

`undefined` \| `number`

***

### getIndexOffset()

> **getIndexOffset**(`index`): `undefined` \| `number`

Defined in: [types.ts:110](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L110)

#### Parameters

##### index

`number`

#### Returns

`undefined` \| `number`

***

### getIndexSize()

> **getIndexSize**(`index`): `undefined` \| `number`

Defined in: [types.ts:112](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L112)

#### Parameters

##### index

`number`

#### Returns

`undefined` \| `number`

***

### isIdInViewport()

> **isIdInViewport**(`id`): `boolean`

Defined in: [types.ts:107](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L107)

#### Parameters

##### id

[`MessageId`](../type-aliases/MessageId.md)\<`M`\>

#### Returns

`boolean`

***

### isIndexInViewport()

> **isIndexInViewport**(`index`): `boolean`

Defined in: [types.ts:106](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L106)

#### Parameters

##### index

`number`

#### Returns

`boolean`

***

### scrollBy()

> **scrollBy**(`offset`): `void`

Defined in: [types.ts:117](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L117)

#### Parameters

##### offset

`number`

#### Returns

`void`

***

### scrollToBottom()

> **scrollToBottom**(`opts?`): `void`

Defined in: [types.ts:119](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L119)

#### Parameters

##### opts?

`ScrollToIndexOpts`

#### Returns

`void`

***

### scrollToId()

> **scrollToId**(`id`, `opts?`): `void`

Defined in: [types.ts:116](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L116)

#### Parameters

##### id

[`MessageId`](../type-aliases/MessageId.md)\<`M`\>

##### opts?

`ScrollToIndexOpts`

#### Returns

`void`

***

### scrollToIndex()

> **scrollToIndex**(`index`, `opts?`): `void`

Defined in: [types.ts:115](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L115)

#### Parameters

##### index

`number`

##### opts?

`ScrollToIndexOpts`

#### Returns

`void`

***

### scrollToOffset()

> **scrollToOffset**(`offset`): `void`

Defined in: [types.ts:114](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L114)

#### Parameters

##### offset

`number`

#### Returns

`void`

***

### scrollToTop()

> **scrollToTop**(`opts?`): `void`

Defined in: [types.ts:118](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L118)

#### Parameters

##### opts?

`ScrollToIndexOpts`

#### Returns

`void`

## Properties

### atBottom

> **atBottom**: `boolean`

Defined in: [types.ts:92](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L92)

***

### atTop

> **atTop**: `boolean`

Defined in: [types.ts:91](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L91)

***

### idsToIndexes

> **idsToIndexes**: `Map`\<[`MessageId`](../type-aliases/MessageId.md)\<`M`\>, `number`\>

Defined in: [types.ts:93](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L93)

***

### indexesToIds

> **indexesToIds**: `Map`\<`number`, [`MessageId`](../type-aliases/MessageId.md)\<`M`\>\>

Defined in: [types.ts:94](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L94)

***

### newestIdInViewport

> **newestIdInViewport**: `undefined` \| [`MessageId`](../type-aliases/MessageId.md)\<`M`\>

Defined in: [types.ts:105](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L105)

***

### newestIndexInViewport

> **newestIndexInViewport**: `number`

Defined in: [types.ts:104](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L104)

***

### newestSeenId

> **newestSeenId**: `undefined` \| [`MessageId`](../type-aliases/MessageId.md)\<`M`\>

Defined in: [types.ts:98](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L98)

***

### newestSeenIndex

> **newestSeenIndex**: `undefined` \| `number`

Defined in: [types.ts:99](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L99)

***

### oldestIdInViewport

> **oldestIdInViewport**: `undefined` \| [`MessageId`](../type-aliases/MessageId.md)\<`M`\>

Defined in: [types.ts:103](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L103)

***

### oldestIndexInViewport

> **oldestIndexInViewport**: `number`

Defined in: [types.ts:102](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L102)

***

### oldestSeenId

> **oldestSeenId**: `undefined` \| [`MessageId`](../type-aliases/MessageId.md)\<`M`\>

Defined in: [types.ts:100](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L100)

***

### oldestSeenIndex

> **oldestSeenIndex**: `undefined` \| `number`

Defined in: [types.ts:101](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L101)

***

### scrollOffset

> **scrollOffset**: `undefined` \| `number`

Defined in: [types.ts:95](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L95)

***

### scrollSize

> **scrollSize**: `undefined` \| `number`

Defined in: [types.ts:96](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L96)

***

### viewportSize

> **viewportSize**: `undefined` \| `number`

Defined in: [types.ts:97](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L97)

***

### vListHandle

> **vListHandle**: `null` \| `VListHandle`

Defined in: [types.ts:90](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L90)

***

### wasIdSeen()

> **wasIdSeen**: (`id`) => `boolean`

Defined in: [types.ts:109](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L109)

#### Parameters

##### id

[`MessageId`](../type-aliases/MessageId.md)\<`M`\>

#### Returns

`boolean`

***

### wasIndexSeen()

> **wasIndexSeen**: (`index`) => `boolean`

Defined in: [types.ts:108](https://github.com/wix-incubator/chat-viewer/blob/e96df3d365886b675050c785cc1263aee40928fe/lib/types.ts#L108)

#### Parameters

##### index

`number`

#### Returns

`boolean`
