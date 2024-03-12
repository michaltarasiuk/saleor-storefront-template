export function isDefined<Value>(value: Value): value is NonNullable<Value> {
	return value !== null && value !== undefined;
}
