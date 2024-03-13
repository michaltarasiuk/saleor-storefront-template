import { useParams } from "next/navigation";

export function useChannel() {
	const params = useParams<{ channel: string }>();

	return params.channel;
}
