[**API Reference**](../README.md)

***

# Function: followAtBottom()

> **followAtBottom**\<`M`\>(`opts`): [`ChatCallback`](../type-aliases/ChatCallback.md)\<`M`\>

Defined in: [lib/follow-strategies.ts:22](https://github.com/wix-incubator/chat-viewer/blob/2fbf016d3c8ddf9c67df1f283a6f305bdb2c2dc5/lib/follow-strategies.ts#L22)

A helper function that creates a callback to scroll to the bottom of the chat viewer when the chat is at the bottom.
It can be used to scroll to the new messages or to the suffix when it is visible.
It returns a generic [ChatCallback](../type-aliases/ChatCallback.md) that can be used with the chat viewer.

## Type Parameters

### M

`M` *extends* [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md)

## Parameters

### opts

`ScrollToIndexOpts` = `DEFAULT_SCROLL_OPTS`

[ScrollToItemOpts](../interfaces/ScrollToItemOpts.md) options for controlling the scroll behavior

## Returns

[`ChatCallback`](../type-aliases/ChatCallback.md)\<`M`\>

A callback that performs the scroll action.
