import {Text, View} from 'react-native';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const MenuItem = ({text, action, value, icon}) => {
  return (
    <MenuOption onSelect={() => action (value)}>
      <View
        style={{
          paddingHorizontal: 10,
          paddingVertical: 5,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Text style={{fontSize:hp(1.7), color: '#333'}}>{text}</Text>
        {icon}
      </View>

    </MenuOption>
  );
};
