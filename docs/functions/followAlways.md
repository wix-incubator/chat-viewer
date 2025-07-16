[**Chat Viewer**](../README.md)

***

# Function: followAlways()

> **followAlways**\<`M`\>(`opts`): [`ChatCallback`](../type-aliases/ChatCallback.md)\<`M`\>

Defined in: [lib/follow-strategies.ts:39](https://github.com/wix-incubator/chat-viewer/blob/83481c9b59373be99cbdd28a40e5ba8a4798e38a/lib/follow-strategies.ts#L39)

A helper function that creates a callback to scroll to the bottom of the chat viewer.
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
