import React from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./Styles/AlertStyles";
import Modal from "react-native-modal";
import Colors from "../themes/Colors";

const AlertBox = ({
  title,
  desc,
  onCancel,
  onConfirm,
  cancelBtnText,
  confirmBtnText,
  isVisible,
  isSubdesc,
  descStyle,
}) => {
  return (
    <Modal isVisible={isVisible} style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{title}</Text>
        {isSubdesc && <Text style={styles.descText}>{isSubdesc}</Text>}

        <Text style={[styles.descText, descStyle]}>{desc}</Text>

        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          {cancelBtnText ? (
            <TouchableOpacity
              onPress={onCancel}
              style={[
                styles.btn,
                { backgroundColor: Colors.whiteF1F2, elevation: 5 },
              ]}
            >
              <Text style={styles.cancelText} numberOfLines={1}>
                {cancelBtnText}
              </Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.btn} />
          )}
          <TouchableOpacity
            onPress={onConfirm}
            style={[styles.btn, { backgroundColor:Colors.RedHeader}]}
          >
            <Text style={styles.confirmText} numberOfLines={1}>
              {confirmBtnText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AlertBox;
