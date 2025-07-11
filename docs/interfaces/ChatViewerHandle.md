[**API Reference**](../README.md)

***

[API Reference](../README.md) / ChatViewerHandle

# Interface: ChatViewerHandle\<M\>

Defined in: [types.ts:90](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L90)

## Type Parameters

### M

`M` *extends* [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md) = [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md)

## Methods

### getIdOffset()

> **getIdOffset**(`id`): `undefined` \| `number`

Defined in: [types.ts:114](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L114)

#### Parameters

##### id

[`MessageId`](../type-aliases/MessageId.md)\<`M`\>

#### Returns

`undefined` \| `number`

***

### getIdSize()

> **getIdSize**(`id`): `undefined` \| `number`

Defined in: [types.ts:116](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L116)

#### Parameters

##### id

[`MessageId`](../type-aliases/MessageId.md)\<`M`\>

#### Returns

`undefined` \| `number`

***

### getIndexOffset()

> **getIndexOffset**(`index`): `undefined` \| `number`

Defined in: [types.ts:113](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L113)

#### Parameters

##### index

`number`

#### Returns

`undefined` \| `number`

***

### getIndexSize()

> **getIndexSize**(`index`): `undefined` \| `number`

Defined in: [types.ts:115](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L115)

#### Parameters

##### index

`number`

#### Returns

`undefined` \| `number`

***

### isIdInViewport()

> **isIdInViewport**(`id`): `boolean`

Defined in: [types.ts:110](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L110)

#### Parameters

##### id

[`MessageId`](../type-aliases/MessageId.md)\<`M`\>

#### Returns

`boolean`

***

### isIndexInViewport()

> **isIndexInViewport**(`index`): `boolean`

Defined in: [types.ts:109](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L109)

#### Parameters

##### index

`number`

#### Returns

`boolean`

***

### scrollBy()

> **scrollBy**(`offset`): `void`

Defined in: [types.ts:120](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L120)

#### Parameters

##### offset

`number`

#### Returns

`void`

***

### scrollToBottom()

> **scrollToBottom**(`opts?`): `void`

Defined in: [types.ts:122](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L122)

#### Parameters

##### opts?

`ScrollToIndexOpts`

#### Returns

`void`

***

### scrollToId()

> **scrollToId**(`id`, `opts?`): `void`

Defined in: [types.ts:119](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L119)

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

Defined in: [types.ts:118](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L118)

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

Defined in: [types.ts:117](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L117)

#### Parameters

##### offset

`number`

#### Returns

`void`

***

### scrollToTop()

> **scrollToTop**(`opts?`): `void`

Defined in: [types.ts:121](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L121)

#### Parameters

##### opts?

`ScrollToIndexOpts`

#### Returns

`void`

## Properties

### atBottom

> **atBottom**: `boolean`

Defined in: [types.ts:95](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L95)

***

### atTop

> **atTop**: `boolean`

Defined in: [types.ts:94](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L94)

***

### idsToIndexes

> **idsToIndexes**: `Map`\<[`MessageId`](../type-aliases/MessageId.md)\<`M`\>, `number`\>

Defined in: [types.ts:96](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L96)

***

### indexesToIds

> **indexesToIds**: `Map`\<`number`, [`MessageId`](../type-aliases/MessageId.md)\<`M`\>\>

Defined in: [types.ts:97](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L97)

***

### newestIdInViewport

> **newestIdInViewport**: `undefined` \| [`MessageId`](../type-aliases/MessageId.md)\<`M`\>

Defined in: [types.ts:108](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L108)

***

### newestIndexInViewport

> **newestIndexInViewport**: `number`

Defined in: [types.ts:107](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L107)

***

### newestSeenId

> **newestSeenId**: `undefined` \| [`MessageId`](../type-aliases/MessageId.md)\<`M`\>

Defined in: [types.ts:101](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L101)

***

### newestSeenIndex

> **newestSeenIndex**: `undefined` \| `number`

Defined in: [types.ts:102](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L102)

***

### oldestIdInViewport

> **oldestIdInViewport**: `undefined` \| [`MessageId`](../type-aliases/MessageId.md)\<`M`\>

Defined in: [types.ts:106](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L106)

***

### oldestIndexInViewport

> **oldestIndexInViewport**: `number`

Defined in: [types.ts:105](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L105)

***

### oldestSeenId

> **oldestSeenId**: `undefined` \| [`MessageId`](../type-aliases/MessageId.md)\<`M`\>

Defined in: [types.ts:103](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L103)

***

### oldestSeenIndex

> **oldestSeenIndex**: `undefined` \| `number`

Defined in: [types.ts:104](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L104)

***

### scrollOffset

> **scrollOffset**: `undefined` \| `number`

Defined in: [types.ts:98](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L98)

***

### scrollSize

> **scrollSize**: `undefined` \| `number`

Defined in: [types.ts:99](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L99)

***

### viewportSize

> **viewportSize**: `undefined` \| `number`

Defined in: [types.ts:100](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L100)

***

### vListHandle

> **vListHandle**: `null` \| `VListHandle`

Defined in: [types.ts:93](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L93)

***

### wasIdSeen()

> **wasIdSeen**: (`id`) => `boolean`

Defined in: [types.ts:112](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L112)

#### Parameters

##### id

[`MessageId`](../type-aliases/MessageId.md)\<`M`\>

#### Returns

`boolean`

***

### wasIndexSeen()

> **wasIndexSeen**: (`index`) => `boolean`

Defined in: [types.ts:111](https://github.com/wix-incubator/chat-viewer/blob/15bf3285badb80da9e01685e151f498ed816c224/lib/types.ts#L111)

#### Parameters

##### index

`number`

#### Returns

`boolean`
