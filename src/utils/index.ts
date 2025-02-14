export function filterBoolean<ItemT>(arr: ItemT[]) {
  return safe(arr, []).filter(Boolean) as Array<NonNullable<ItemT>>;
}

export function isNotNil(item: unknown) {
  return item != null;
}

export function filterNotNil<ItemT>(arr: ItemT[]) {
  return safe(arr, []).filter(isNotNil) as Array<NonNullable<ItemT>>;
}

export type Nullable<T> = T | null | undefined;

export function safe<TargetT>(value: Nullable<TargetT>, fallback: TargetT) {
  if (Array.isArray(fallback)) {
    return Array.isArray(value) ? value : [];
  }

  if (typeof fallback === "number") {
    return typeof value === "number" ? value : fallback;
  }

  if (typeof fallback === "string") {
    return typeof value === "string" ? value : fallback;
  }

  return value ?? fallback;
}

export * from "./wait";
