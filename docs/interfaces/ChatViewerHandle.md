[**API Reference**](../README.md)

***

# Interface: ChatViewerHandle\<M\>

Defined in: [lib/types.ts:244](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L244)

## Type Parameters

### M

`M` *extends* [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md) = [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md)

## Methods

### getIdOffset()

> **getIdOffset**(`id`): `undefined` \| `number`

Defined in: [lib/types.ts:345](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L345)

Returns the scroll offset for the given message ID, or undefined if not available.

#### Parameters

##### id

[`MessageId`](../type-aliases/MessageId.md)\<`M`\>

The [MessageId](../type-aliases/MessageId.md) to get the offset for.

#### Returns

`undefined` \| `number`

***

### getIdSize()

> **getIdSize**(`id`): `undefined` \| `number`

Defined in: [lib/types.ts:355](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L355)

Returns the size of the item with the given message ID, or undefined if not available.

#### Parameters

##### id

[`MessageId`](../type-aliases/MessageId.md)\<`M`\>

The [MessageId](../type-aliases/MessageId.md) to get the size for.

#### Returns

`undefined` \| `number`

***

### getIndexOffset()

> **getIndexOffset**(`index`): `undefined` \| `number`

Defined in: [lib/types.ts:340](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L340)

Returns the scroll offset for the given index, or undefined if not available.

#### Parameters

##### index

`number`

The index to get the offset for.

#### Returns

`undefined` \| `number`

***

### getIndexSize()

> **getIndexSize**(`index`): `undefined` \| `number`

Defined in: [lib/types.ts:350](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L350)

Returns the size of the item at the given index, or undefined if not available.

#### Parameters

##### index

`number`

The index to get the size for.

#### Returns

`undefined` \| `number`

***

### isIdInViewport()

> **isIdInViewport**(`id`): `boolean`

Defined in: [lib/types.ts:325](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L325)

Returns true if the given message ID is currently visible in the viewport.

#### Parameters

##### id

[`MessageId`](../type-aliases/MessageId.md)\<`M`\>

The [MessageId](../type-aliases/MessageId.md) to check.

#### Returns

`boolean`

***

### isIndexInViewport()

> **isIndexInViewport**(`index`): `boolean`

Defined in: [lib/types.ts:320](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L320)

Returns true if the given index is currently visible in the viewport.

#### Parameters

##### index

`number`

The index to check.

#### Returns

`boolean`

***

### scrollBy()

> **scrollBy**(`offset`): `void`

Defined in: [lib/types.ts:377](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L377)

Scrolls by the specified offset.

#### Parameters

##### offset

`number`

The amount to scroll by.

#### Returns

`void`

***

### scrollToBottom()

> **scrollToBottom**(`opts?`): `void`

Defined in: [lib/types.ts:387](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L387)

Scrolls to the bottom of the messages list.

#### Parameters

##### opts?

`ScrollToIndexOpts`

Optional scroll options.

#### Returns

`void`

***

### scrollToId()

> **scrollToId**(`id`, `opts?`): `void`

Defined in: [lib/types.ts:372](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L372)

Scrolls to the item with the specified message ID.

#### Parameters

##### id

[`MessageId`](../type-aliases/MessageId.md)\<`M`\>

The message ID to scroll to.

##### opts?

`ScrollToIndexOpts`

Optional scroll options.

#### Returns

`void`

***

### scrollToIndex()

> **scrollToIndex**(`index`, `opts?`): `void`

Defined in: [lib/types.ts:366](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L366)

Scrolls to the specified index.

#### Parameters

##### index

`number`

The index to scroll to.

##### opts?

`ScrollToIndexOpts`

Optional scroll options.

#### Returns

`void`

***

### scrollToOffset()

> **scrollToOffset**(`offset`): `void`

Defined in: [lib/types.ts:360](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L360)

Scrolls to the specified offset.

#### Parameters

##### offset

`number`

The scroll offset to scroll to.

#### Returns

`void`

***

### scrollToTop()

> **scrollToTop**(`opts?`): `void`

Defined in: [lib/types.ts:382](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L382)

Scrolls to the top of the messages list.

#### Parameters

##### opts?

`ScrollToIndexOpts`

Optional scroll options.

#### Returns

`void`

## Properties

### atBottom

> **atBottom**: `boolean`

Defined in: [lib/types.ts:262](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L262)

Whether the viewport is currently at the bottom of the message list.
Use [ChatViewerProps#onAtBottom](ChatViewerProps.md#onatbottom) to be notified when the viewport reaches the bottom.

***

### atTop

> **atTop**: `boolean`

Defined in: [lib/types.ts:257](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L257)

Whether the viewport is currently at the top of the message list.
Use [ChatViewerProps#onAtTop](ChatViewerProps.md#onattop) to be notified when the viewport reaches the top.

***

### idsToIndexes

> **idsToIndexes**: `Map`\<[`MessageId`](../type-aliases/MessageId.md)\<`M`\>, `number`\>

Defined in: [lib/types.ts:266](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L266)

Map of message IDs to their corresponding indexes in the list.

***

### indexesToIds

> **indexesToIds**: `Map`\<`number`, [`MessageId`](../type-aliases/MessageId.md)\<`M`\>\>

Defined in: [lib/types.ts:270](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L270)

Map of indexes to their corresponding [MessageId](../type-aliases/MessageId.md) in the list.

***

### newestIdInViewport

> **newestIdInViewport**: `undefined` \| [`MessageId`](../type-aliases/MessageId.md)\<`M`\>

Defined in: [lib/types.ts:314](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L314)

The [MessageId](../type-aliases/MessageId.md) of the newest message currently visible in the viewport, or undefined if not available.

***

### newestIndexInViewport

> **newestIndexInViewport**: `number`

Defined in: [lib/types.ts:310](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L310)

The index of the newest message currently visible in the viewport.

***

### newestSeenId

> **newestSeenId**: `undefined` \| [`MessageId`](../type-aliases/MessageId.md)\<`M`\>

Defined in: [lib/types.ts:286](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L286)

The [MessageId](../type-aliases/MessageId.md) of the newest message that is present in the viewport, or undefined if not available.

***

### newestSeenIndex

> **newestSeenIndex**: `undefined` \| `number`

Defined in: [lib/types.ts:290](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L290)

The index of the newest message that is present in the viewport, or undefined if not available.

***

### oldestIdInViewport

> **oldestIdInViewport**: `undefined` \| [`MessageId`](../type-aliases/MessageId.md)\<`M`\>

Defined in: [lib/types.ts:306](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L306)

The [MessageId](../type-aliases/MessageId.md) of the oldest message currently visible in the viewport, or undefined if not available.

***

### oldestIndexInViewport

> **oldestIndexInViewport**: `number`

Defined in: [lib/types.ts:302](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L302)

The index of the oldest message currently visible in the viewport.

***

### oldestSeenId

> **oldestSeenId**: `undefined` \| [`MessageId`](../type-aliases/MessageId.md)\<`M`\>

Defined in: [lib/types.ts:294](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L294)

The [MessageId](../type-aliases/MessageId.md) of the oldest message that has been seen (was at least once within the viewport), or undefined if not available.

***

### oldestSeenIndex

> **oldestSeenIndex**: `undefined` \| `number`

Defined in: [lib/types.ts:298](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L298)

The index of the oldest message that has been seen (was at least once within the viewport), or undefined if not available.

***

### scrollOffset

> **scrollOffset**: `undefined` \| `number`

Defined in: [lib/types.ts:274](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L274)

Current scroll offset, or undefined if not available.

***

### scrollSize

> **scrollSize**: `undefined` \| `number`

Defined in: [lib/types.ts:278](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L278)

Total scrollable size, or undefined if not available.

***

### viewportSize

> **viewportSize**: `undefined` \| `number`

Defined in: [lib/types.ts:282](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L282)

Size of the viewport, or undefined if not available.

***

### vListHandle

> **vListHandle**: `null` \| `VListHandle`

Defined in: [lib/types.ts:252](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L252)

Reference to the underlying Virtua's `VListHandle`, or null if not available.

#### See

https://github.com/inokawa/virtua/blob/main/docs/react/interfaces/VListHandle.md

***

### wasIdSeen()

> **wasIdSeen**: (`id`) => `boolean`

Defined in: [lib/types.ts:335](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L335)

Returns true if the given message ID has ever been seen in the viewport.

#### Parameters

##### id

[`MessageId`](../type-aliases/MessageId.md)\<`M`\>

The [MessageId](../type-aliases/MessageId.md) to check.

#### Returns

`boolean`

***

### wasIndexSeen()

> **wasIndexSeen**: (`index`) => `boolean`

Defined in: [lib/types.ts:330](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/types.ts#L330)

Returns true if the given index has ever been seen in the viewport.

#### Parameters

##### index

`number`

The index to check.

#### Returns

`boolean`
