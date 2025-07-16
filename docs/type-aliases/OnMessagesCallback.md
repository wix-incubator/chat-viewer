[**API Reference**](../README.md)

***

# Type Alias: OnMessagesCallback()\<M\>

> **OnMessagesCallback**\<`M`\> = (`handle`, `messages`) => `void`

Defined in: [lib/types.ts:62](https://github.com/wix-incubator/chat-viewer/blob/2fbf016d3c8ddf9c67df1f283a6f305bdb2c2dc5/lib/types.ts#L62)

Callback fired when messages updated.
This library automatically tracks changes to the `messages` prop, so this callback will receive only new messages.

## Type Parameters

### M

`M` *extends* [`IdentifiableMessage`](IdentifiableMessage.md) = [`IdentifiableMessage`](IdentifiableMessage.md)

## Parameters

### handle

[`ChatViewerHandle`](../interfaces/ChatViewerHandle.md)\<`M`\>

[ChatViewerHandle](../interfaces/ChatViewerHandle.md) instance. Allows you to control the chat viewer.

### messages

`M`[]

The current messages.

## Returns

`void`
