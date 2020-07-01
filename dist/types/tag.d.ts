import { Observable } from 'rxjs';
import { Arc, IApolloQueryOptions } from './arc';
import { Proposal } from './proposal';
import { ICommonQueryOptions, IStateful } from './types';
export interface ITagStaticState {
    id: string;
    numberOfProposals: number;
}
export interface ITagState extends ITagStaticState {
    id: string;
    proposals: Proposal[];
}
export interface ITagQueryOptions extends ICommonQueryOptions {
    where?: {
        id?: string;
        proposal?: string;
    };
}
export declare class Tag implements IStateful<ITagState> {
    context: Arc;
    static fragments: {
        TagFields: import("graphql").DocumentNode;
    };
    /**
     * Tag.search(context, options) searches for stake entities
     * @param  context an Arc instance that provides connection information
     * @param  options the query options, cf. ITagQueryOptions
     * @return         an observable of Tag objects
     */
    static search(context: Arc, options?: ITagQueryOptions, apolloQueryOptions?: IApolloQueryOptions): Observable<Tag[]>;
    id: string | undefined;
    staticState: ITagStaticState | undefined;
    constructor(idOrOpts: string | ITagStaticState, context: Arc);
    state(apolloQueryOptions?: IApolloQueryOptions): Observable<ITagState>;
    setStaticState(opts: ITagStaticState): void;
    fetchStaticState(): Promise<ITagStaticState>;
}
