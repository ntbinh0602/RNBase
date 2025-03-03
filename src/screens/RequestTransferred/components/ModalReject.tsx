import {View, Text} from 'react-native';
import React from 'react';
import CustomModal from '../../../components/CustomModal';
import tw from 'twrnc';
import Icon from '../../../common/icons';
import Colors from '../../../utils/colors';

interface ModalRejectProps {
  openStore?: boolean;
  onClose?: () => void;
  onConfirm?: () => void;
  isLoading?: boolean;
}

const ModalReject: React.FC<ModalRejectProps> = ({
  openStore,
  onClose,
  onConfirm,
  isLoading = false,
}) => {
  return (
    <CustomModal
      visible={openStore}
      width={'40%'}
      title="Từ chối"
      onClose={onClose}
      onConfirm={onConfirm}
      bgColorConfirm={Colors.danger}
      isLoading={isLoading}
      modalIcon={() => (
        <View style={tw`bg-[#F0F9FF] p-2 rounded-[50px]`}>
          <View style={tw`bg-[#E0F2FE] p-2 rounded-[50px]`}>
            <Icon
              type="Ionicons"
              name="storefront-outline"
              color="#005FAB"
              size={28}
            />
          </View>
        </View>
      )}
      buttonAxis="vertical">
      {/* <QuantityInput
          disabled={10 <= valueRedo}
          value={valueRedo}
          onChange={value => handleChangeRedo(value)}
        /> */}
    </CustomModal>
  );
};

export default ModalReject;
