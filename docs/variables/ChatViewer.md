[**API Reference**](../README.md)

***

# Variable: ChatViewer()

> `const` **ChatViewer**: \<`M`\>(`props`) => `ReactElement`

Defined in: [lib/chat-viewer.tsx:375](https://github.com/wix-incubator/chat-viewer/blob/471a1f3ecfdb5a33a5c084cf260a676004074615/lib/chat-viewer.tsx#L375)

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
