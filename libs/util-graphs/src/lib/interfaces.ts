export type DefaultDataSchema = Record<string, unknown>;

export type BaseElement<DataSchema = DefaultDataSchema> = {
  id: string;
  data: DataSchema;
};

export interface Node<DataSchema = DefaultDataSchema>
  extends BaseElement<DataSchema> {
  type: 'node';
}

export interface Edge<DataSchema = DefaultDataSchema>
  extends BaseElement<DataSchema> {
  type: 'edge';
  source: string;
  target: string;
}

export type Element<DataSchema = DefaultDataSchema> = Node<DataSchema> | Edge<DataSchema>;
