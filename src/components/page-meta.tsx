type Props = {
  title?: string;
  description?: string;
  keywords?: string[];
};

// This can be placed at the top of mdx pages to set the document title
export default function PageMeta(props: Props) {
  return (
    <>
      {props.title ? <title>{props.title}</title> : null}

      {props.description ? (
        <meta name="description" content={props.description} />
      ) : null}

      {props.keywords ? (
        <meta name="keywords" content={props.keywords.join(', ')} />
      ) : null}
    </>
  );
}
