function Grid(props: React.ComponentProps<"ul">) {
  return (
    <ul {...props} className={props.className}>
      {props.children}
    </ul>
  );
}

function GridItem(props: React.ComponentProps<"li">) {
  return (
    <li {...props} className={props.className}>
      {props.children}
    </li>
  );
}

Grid.Item = GridItem;

export default Grid;
