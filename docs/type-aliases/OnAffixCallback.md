[**API Reference**](../README.md)

***

# Type Alias: OnAffixCallback()\<M\>

> **OnAffixCallback**\<`M`\> = (`handle`, `isDisplayed`) => `void`

Defined in: [lib/types.ts:71](https://github.com/wix-incubator/chat-viewer/blob/2fbf016d3c8ddf9c67df1f283a6f305bdb2c2dc5/lib/types.ts#L71)

Callback fired when the [ChatViewerProps.prefix](../interfaces/ChatViewerProps.md#prefix) or [ChatViewerProps.suffix](../interfaces/ChatViewerProps.md#suffix) node is displayed in the viewport.

## Type Parameters

### M

`M` *extends* [`IdentifiableMessage`](IdentifiableMessage.md) = [`IdentifiableMessage`](IdentifiableMessage.md)

## Parameters

### handle

[`ChatViewerHandle`](../interfaces/ChatViewerHandle.md)\<`M`\>

[ChatViewerHandle](../interfaces/ChatViewerHandle.md) instance. Allows you to control the chat viewer.

### isDisplayed

`boolean`

Whether the prefix or suffix is displayed.

## Returns

`void`
