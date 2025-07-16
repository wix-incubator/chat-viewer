[**Chat Viewer**](../README.md)

***

# Interface: ChatViewerHandle\<M\>

Defined in: [lib/types.ts:276](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L276)

## Type Parameters

### M

`M` *extends* [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md) = [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md)

## Methods

### getIdOffset()

> **getIdOffset**(`id`): `undefined` \| `number`

Defined in: [lib/types.ts:377](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L377)

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

Defined in: [lib/types.ts:387](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L387)

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

Defined in: [lib/types.ts:372](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L372)

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

Defined in: [lib/types.ts:382](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L382)

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

Defined in: [lib/types.ts:357](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L357)

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

Defined in: [lib/types.ts:352](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L352)

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

Defined in: [lib/types.ts:409](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L409)

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

Defined in: [lib/types.ts:419](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L419)

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

Defined in: [lib/types.ts:404](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L404)

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

Defined in: [lib/types.ts:398](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L398)

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

Defined in: [lib/types.ts:392](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L392)

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

Defined in: [lib/types.ts:414](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L414)

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

Defined in: [lib/types.ts:294](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L294)

Whether the viewport is currently at the bottom of the message list.
Use [ChatViewerProps#onAtBottom](ChatViewerProps.md#onatbottom) to be notified when the viewport reaches the bottom.

***

### atTop

> **atTop**: `boolean`

Defined in: [lib/types.ts:289](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L289)

Whether the viewport is currently at the top of the message list.
Use [ChatViewerProps#onAtTop](ChatViewerProps.md#onattop) to be notified when the viewport reaches the top.

***

### idsToIndexes

> **idsToIndexes**: `Map`\<[`MessageId`](../type-aliases/MessageId.md)\<`M`\>, `number`\>

Defined in: [lib/types.ts:298](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L298)

Map of message IDs to their corresponding indexes in the list.

***

### indexesToIds

> **indexesToIds**: `Map`\<`number`, [`MessageId`](../type-aliases/MessageId.md)\<`M`\>\>

Defined in: [lib/types.ts:302](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L302)

Map of indexes to their corresponding [MessageId](../type-aliases/MessageId.md) in the list.

***

### newestIdInViewport

> **newestIdInViewport**: `undefined` \| [`MessageId`](../type-aliases/MessageId.md)\<`M`\>

Defined in: [lib/types.ts:346](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L346)

The [MessageId](../type-aliases/MessageId.md) of the newest message currently visible in the viewport, or undefined if not available.

***

### newestIndexInViewport

> **newestIndexInViewport**: `number`

Defined in: [lib/types.ts:342](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L342)

The index of the newest message currently visible in the viewport.

***

### newestSeenId

> **newestSeenId**: `undefined` \| [`MessageId`](../type-aliases/MessageId.md)\<`M`\>

Defined in: [lib/types.ts:318](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L318)

The [MessageId](../type-aliases/MessageId.md) of the newest message that is present in the viewport, or undefined if not available.

***

### newestSeenIndex

> **newestSeenIndex**: `undefined` \| `number`

Defined in: [lib/types.ts:322](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L322)

The index of the newest message that is present in the viewport, or undefined if not available.

***

### oldestIdInViewport

> **oldestIdInViewport**: `undefined` \| [`MessageId`](../type-aliases/MessageId.md)\<`M`\>

Defined in: [lib/types.ts:338](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L338)

The [MessageId](../type-aliases/MessageId.md) of the oldest message currently visible in the viewport, or undefined if not available.

***

### oldestIndexInViewport

> **oldestIndexInViewport**: `number`

Defined in: [lib/types.ts:334](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L334)

The index of the oldest message currently visible in the viewport.

***

### oldestSeenId

> **oldestSeenId**: `undefined` \| [`MessageId`](../type-aliases/MessageId.md)\<`M`\>

Defined in: [lib/types.ts:326](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L326)

The [MessageId](../type-aliases/MessageId.md) of the oldest message that has been seen (was at least once within the viewport), or undefined if not available.

***

### oldestSeenIndex

> **oldestSeenIndex**: `undefined` \| `number`

Defined in: [lib/types.ts:330](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L330)

The index of the oldest message that has been seen (was at least once within the viewport), or undefined if not available.

***

### scrollOffset

> **scrollOffset**: `undefined` \| `number`

Defined in: [lib/types.ts:306](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L306)

Current scroll offset, or undefined if not available.

***

### scrollSize

> **scrollSize**: `undefined` \| `number`

Defined in: [lib/types.ts:310](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L310)

Total scrollable size, or undefined if not available.

***

### viewportSize

> **viewportSize**: `undefined` \| `number`

Defined in: [lib/types.ts:314](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L314)

Size of the viewport, or undefined if not available.

***

### vListHandle

> **vListHandle**: `null` \| `VListHandle`

Defined in: [lib/types.ts:284](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L284)

Reference to the underlying Virtua's `VListHandle`, or null if not available.

#### See

https://github.com/inokawa/virtua/blob/main/docs/react/interfaces/VListHandle.md

***

### wasIdSeen()

> **wasIdSeen**: (`id`) => `boolean`

Defined in: [lib/types.ts:367](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L367)

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

Defined in: [lib/types.ts:362](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/types.ts#L362)

Returns true if the given index has ever been seen in the viewport.

#### Parameters

##### index

`number`

The index to check.

#### Returns

`boolean`
