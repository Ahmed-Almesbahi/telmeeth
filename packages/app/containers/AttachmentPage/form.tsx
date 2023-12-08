import React, { useState } from 'react';
import { View, Linking, GestureResponderEvent } from 'react-native';
import styles from './styles';
import { Icon, MaterialCommunityIcons, Text } from '../../components';
import { TouchableRipple, Button } from 'react-native-paper';
import { themeTeacher } from '../App/themes';
import { AttachmentFormProps } from './types';
// import Test from "./test";
import ImagePicker from '../../components/ImagePicker';
import { Platform } from '../../components/Platform';
import { MediaTypeOptions } from '../../components/ImagePicker/types';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

// import ImageView from 'react-native-image-view';
import ImageView from 'react-native-image-zoom-viewer';
import Modal from '../../components/Modal';

const size = 130;
const AttachmentForm = (props: AttachmentFormProps) => {
  const [state, setState] = useState({
    data: null,
    fullscreen: false,
    loading: false,
    image: null
  });
  const [image, setImage] = useState({
    visible: false,
    loading: false,
    fadeVisible: true,
    imageIndex: 0,
    isImageViewVisible: false
  });

  const preview = () => {
    if (props.data.attachement_id > 0) {
      return (
        <>
          <TouchableRipple
            onPress={() => {
              // openImage(props.data.attachement_name);
              setImage({
                ...image,
                imageIndex: 0,
                loading: false,
                isImageViewVisible: true
              });
            }}
            style={{ marginTop: 50, alignItems: 'center' }}
          >
            <>
              <MaterialCommunityIcons
                name='file-find-outline'
                size={40}
                color={'gray'}
              />
              <Text>
                <FormattedMessage {...messages.preview} />
              </Text>
            </>
          </TouchableRipple>
          <Modal
            visible={image.isImageViewVisible}
            transparent={true}
            style={{ margin: 0 }}
          >
            <ImageView
              // glideAlways
              imageUrls={[
                {
                  // index: 0,
                  url: props.data.attachement_name
                  // title: 'London'
                  // width: "100%",
                  // height: "100%"
                }
              ]}
              // imageIndex={image.imageIndex}
              // animationType='fade'
              // isVisible={image.isImageViewVisible}
              // renderFooter={this.renderFooter}
              onCancel={() => setImage({ ...image, isImageViewVisible: false })}
              enableSwipeDown={true}
            />
          </Modal>
        </>
      );
    }
    return null;
  };

  const openImage = (url: string) => {
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log(`Don't know how to open URI: ${url}`);
      }
    });
  };

  const _pickImage = async (e: any) => {
    console.log(' props.data', props.data);
    if (Platform.OS === 'web') {
      let response = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3]
      });

      let formdata = new FormData();

      formdata.append('attachement_type', props.data.attachement_type);
      formdata.append('document', response);
      props.uploadAttachment(formdata);
    } else {
      // More info on all the options is below in the API Reference... just some common use cases shown here
      const options = {
        quality: 1.0,
        maxWidth: 500,
        maxHeight: 500,
        storageOptions: {
          skipBackup: true
        }
      };
      /**
       * The first arg is the options object for customization (it can also be null or omitted for default options),
       * The second arg is the callback which sends object: response (more info in the API Reference)
       */
      // @ts-ignore
      ImagePicker.showImagePicker(options, (response: any) => {
        console.log('Response = ', response);

        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          let extension: any = /[.]/.exec(response.uri)
            ? /[^.]+$/.exec(response.uri)
            : ['png'];

          props.uploadAttachment([
            {
              name: 'attachement_type',
              data: props.data.attachement_type
            },
            {
              name: 'document',
              filename: 'image' + '.' + extension[0],
              type: response.type,
              data: response.data
            }
          ]);
        }
      });
    }
  };

  const handleFileChange = (event: any) => {
    console.log('working', event);
    const { target } = event;
    const { files } = target;

    if (files && files[0]) {
      var reader = new FileReader();

      reader.onloadstart = () => setState({ ...state, loading: true });

      reader.onload = (event: any) => {
        setState({
          ...state,
          data: event.target.result,
          loading: false
        });
      };

      reader.readAsDataURL(files[0]);
    }
  };

  const existsColor =
    props.data.attachement_id > 0 ? themeTeacher.colors.primary : 'white';
  const existsOddColor =
    props.data.attachement_id > 0 ? 'white' : themeTeacher.colors.primary;
  return (
    <View style={styles.bodyContainer}>
      <TouchableRipple
        style={{
          borderWidth: 1,
          borderColor: themeTeacher.colors.primary,
          backgroundColor: existsColor,
          borderRadius: size / 2,
          width: size,
          height: size,
          justifyContent: 'center',
          alignItems: 'center',
          alignContent: 'center',
          marginBottom: 20
        }}
        // @ts-ignore
        onPress={(event: GestureResponderEvent) => {
          _pickImage(event);
        }}
      >
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <MaterialCommunityIcons
            name='camera-outline'
            size={60}
            color={existsOddColor}
          />
          <Text style={{ color: existsOddColor }}>
            {props.data.attachement_id > 0
              ? props.intl.formatMessage(messages.change)
              : props.intl.formatMessage(messages.upload)}
          </Text>
        </View>
      </TouchableRipple>

      <Text>jpg, png</Text>
      <Text>
        <FormattedMessage {...messages.size} />
      </Text>
      {preview()}
    </View>
  );
};

export default AttachmentForm;
