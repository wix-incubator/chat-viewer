[**API Reference**](../README.md)

***

# Variable: ChatViewer()

> `const` **ChatViewer**: \<`M`\>(`props`) => `ReactElement`

Defined in: [lib/chat-viewer.tsx:375](https://github.com/wix-incubator/chat-viewer/blob/d5c91da65f244d4cd5de38b6c7810418b3052484/lib/chat-viewer.tsx#L375)

ChatViewer component that implements a virtualized chat viewer.
It supports features like prefix and suffix rendering,
scrolling to specific messages, and tracking seen messages.

## Type Parameters

### M

`M` *extends* [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md)

Type of messages, which must extend [IdentifiableMessage](../type-aliases/IdentifiableMessage.md). It can be any type that has an `id` property for unique identifying messages.

## Parameters

### props

`ChatViewerPropsWithRef`\<`M`\>

Properties for the chat viewer, including messages, rendering functions, and event handlers.

## Returns

`ReactElement`
