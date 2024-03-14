import { useParams } from "next/navigation";

export function useChannel() {
	const { channel } = useParams<{ channel: string }>();

	return channel;
}
