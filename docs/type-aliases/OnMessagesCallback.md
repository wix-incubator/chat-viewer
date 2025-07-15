[**API Reference**](../README.md)

***

# Type Alias: OnMessagesCallback()\<M\>

> **OnMessagesCallback**\<`M`\> = (`handle`, `messages`) => `void`

Defined in: [lib/types.ts:62](https://github.com/wix-incubator/chat-viewer/blob/d5c91da65f244d4cd5de38b6c7810418b3052484/lib/types.ts#L62)

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
