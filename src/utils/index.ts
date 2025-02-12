export function filterBoolean<ItemT>(arr: ItemT[]) {
    return (Array.isArray(arr) ? arr : []).filter(Boolean );
}

function isNotNil(item: unknown) {
    return item != null;

}

export function filterNotNil<ItemT>(arr: ItemT[]) {
    return (Array.isArray(arr) ? arr : []).filter(isNotNil  ) as Array<NonNullable<ItemT>>;
}
