import React from "react";
import { View, Text, Modal, TouchableOpacity } from "react-native";
import colors from "../themes/Colors";
import CustomButton from "./CustomButton";
import scale, { verticalScale } from "../themes/Metrics";
import { CustomText } from "./CustomText";
import Fonts from "../themes/Fonts";

export const CustomModal = (props) => {
  return (
    <Modal visible={props.isVisible} animationType="fade" transparent={true}>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.color_00000080,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: colors.whiteText,
            padding: "3%",
            borderRadius: 8,
            width: scale(300),
            alignItems: "center",
          }}
        >
          <CustomText
            item={props.modalMsg}
            style={{
              marginVertical: scale(20),
              fontSize: scale(20),
              fontFamily: Fonts.type.JostMedium,
              textAlign: "center",
            }}
          />
          {/* <Text>
            {props.modalMsg == null ? "Something went wrong !" : props.modalMsg}
          </Text> */}
          {/* <GradientButton title={"Dismiss"} onPress={props.onPressModal} /> */}
          {props.modelTypeOK ? (
            <View
              style={{
                alignSelf: "center",
              }}
            >
              <TouchableOpacity
                //   onPress={props.onPress}
                onPress={props.onPressModalOK}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  height: verticalScale(40),
                  width: scale(80),
                  backgroundColor: colors.borderColor,
                }}
              >
                <CustomText
                  item={"OK"}
                  style={{
                    fontSize: scale(16),
                    color: colors.whiteText,
                    fontFamily: Fonts.type.JostRegular,
                  }}
                />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: scale(250),
              }}
            >
              <TouchableOpacity
                //   onPress={props.onPress}
                onPress={props.onPressModalNo}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  height: verticalScale(40),
                  width: scale(80),
                  backgroundColor: colors.borderColor,
                }}
              >
                <CustomText
                  item={"No"}
                  style={{
                    fontSize: scale(16),
                    color: colors.whiteText,
                    fontFamily: Fonts.type.JostRegular,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                //   onPress={props.onPress}
                onPress={props.onPressModalYes}
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 5,
                  height: verticalScale(40),
                  width: scale(80),
                  backgroundColor: colors.yellowButton,
                }}
              >
                <CustomText
                  item={"Yes"}
                  style={{
                    fontSize: scale(16),
                    color: colors.whiteText,
                    fontFamily: Fonts.type.JostRegular,
                  }}
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};
