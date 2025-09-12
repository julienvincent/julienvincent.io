import { useEffect } from 'react';

type Props = {
  title: string;
};

// This can be placed at the top of mdx pages to set the document title
export default function Title(props: Props) {
  useEffect(() => {
    document.title = `Julien Vincent | ${props.title}`;
  }, [props.title]);

  return null;
}
