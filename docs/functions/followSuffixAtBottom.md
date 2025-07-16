[**Chat Viewer**](../README.md)

***

# Function: followSuffixAtBottom()

> **followSuffixAtBottom**\<`M`\>(`opts`): [`OnAffixCallback`](../type-aliases/OnAffixCallback.md)\<`M`\>

Defined in: [lib/follow-strategies.ts:139](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/follow-strategies.ts#L139)

This is typically used to scroll to the bottom of the chat when the suffix is visible.
For example, when suffix is a typing indicator and it appears when someone is typing a message.

## Type Parameters

### M

`M` *extends* [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md)

## Parameters

### opts

`ScrollToIndexOpts` = `DEFAULT_SCROLL_OPTS`

[ScrollToItemOpts](../interfaces/ScrollToItemOpts.md) options for controlling the scroll behavior

## Returns

[`OnAffixCallback`](../type-aliases/OnAffixCallback.md)\<`M`\>

A callback that performs the scroll action when the suffix is visible.
