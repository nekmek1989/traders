import {IChannel} from "../../components/Channel/ChannelCard/types";
import {sortChannelParam, sortForm} from "../../pages/Traders/types";

type hookSortChannels = (channels: IChannel[], sortParams: sortChannelParam) => IChannel[]

type hookSearchAndSortChannels = (channels: IChannel[], params: sortForm, sortParams: sortChannelParam) => IChannel[] | undefined