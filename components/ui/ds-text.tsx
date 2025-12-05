import { Text, TextProps } from 'react-native';

export function DsText(props: TextProps) {
  return (
    <Text
      {...props}
      style={[
        {
          fontFamily: 'Roboto',
          color: '#ffffff',
          fontSize: 16,
        },
        props.style,
      ]}
    />
  );
}
