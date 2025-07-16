[**API Reference**](../README.md)

***

# Function: followEveryMessage()

> **followEveryMessage**\<`M`\>(`opts`): [`OnMessagesCallback`](../type-aliases/OnMessagesCallback.md)\<`M`\>

Defined in: [lib/follow-strategies.ts:61](https://github.com/wix-incubator/chat-viewer/blob/2fbf016d3c8ddf9c67df1f283a6f305bdb2c2dc5/lib/follow-strategies.ts#L61)

Performs a scroll to the bottom of the chat viewer when a new message is added.
It returns a generic [OnMessagesCallback](../type-aliases/OnMessagesCallback.md) that can be used with the chat viewer.

## Type Parameters

### M

`M` *extends* [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md)

## Parameters

### opts

`ScrollToIndexOpts` = `DEFAULT_SCROLL_OPTS`

[ScrollToItemOpts](../interfaces/ScrollToItemOpts.md) options for controlling the scroll behavior

## Returns

[`OnMessagesCallback`](../type-aliases/OnMessagesCallback.md)\<`M`\>

A callback that performs the scroll action.

## Example

```tsx
<ChatViewer
  messages={messages}
  renderMessage={renderMessage}
  onNewerMessages={followEveryMessage({ smooth: true })}
/>
```
