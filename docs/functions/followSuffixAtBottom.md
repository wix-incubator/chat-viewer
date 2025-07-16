[**API Reference**](../README.md)

***

# Function: followSuffixAtBottom()

> **followSuffixAtBottom**\<`M`\>(`opts`): [`OnAffixCallback`](../type-aliases/OnAffixCallback.md)\<`M`\>

Defined in: [lib/follow-strategies.ts:135](https://github.com/wix-incubator/chat-viewer/blob/2fbf016d3c8ddf9c67df1f283a6f305bdb2c2dc5/lib/follow-strategies.ts#L135)

## Type Parameters

### M

`M` *extends* [`IdentifiableMessage`](../type-aliases/IdentifiableMessage.md)

## Parameters

### opts

`ScrollToIndexOpts` = `DEFAULT_SCROLL_OPTS`

{ScrollToItemOpts} options for controlling the scroll behavior

## Returns

[`OnAffixCallback`](../type-aliases/OnAffixCallback.md)\<`M`\>

A callback that performs the scroll action when the suffix is visible.
