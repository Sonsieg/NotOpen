import React from 'react';
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';

const TempScreen = () => {
  const richText = React.useRef();
  const scrollRef = React.useRef();

  const openGalleryClickProfile = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log('Imagemime', image);
      onPressAddImage(image);
    });
  };

  const onPressAddImage = async image => {
    await ImgToBase64.getBase64String(image.path)
      .then(base64String => {
        const str = `data:${image.mime};base64,${base64String}`;
        console.log('str', str);
        richText.current?.insertImage(str);
      })
      .catch(err => {
        console.log('base64:Image:', err);
      });
  };

  return (
    <SafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView
          ref={scrollRef}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1}}>
          <RichEditor
            ref={richText}
            onChange={descriptionText => {
              console.log('descriptionText:', descriptionText);
            }}
            initialFocus={true}
            initialContentHTML={'<div><br></div>'}
            style={{backgroundColor: 'red'}}
            containerStyle={{backgroundColor: 'gray'}}
            // disabled={true}
            // onCursorPosition={() =>
            //   scrollRef.current.scrollTo(
            //     scrollRef.current.scrollTo({
            //       y: 1000 - 30,
            //       animated: true,
            //     }),
            //   )
            // }
            useContainer={true}
            androidHardwareAccelerationDisabled={true}
            allowFileAccess={true}
          />
          <RichToolbar
            editor={richText}
            actions={[
              actions.insertImage,
              actions.setBold,
              actions.setItalic,
              actions.insertBulletsList,
              actions.insertOrderedList,
              actions.insertLink,
              actions.keyboard,
              actions.setStrikethrough,
              actions.setUnderline,
              actions.removeFormat,
              actions.insertVideo,
              actions.checkboxList,
              actions.undo,
              actions.redo,
              actions.heading1,
              'customAction',
            ]}
            iconMap={{
              [actions.heading1]: ({tintColor}) => (
                <Text style={[{color: 'red'}]}>H111111</Text>
              ),
            }}
            onPressAddImage={openGalleryClickProfile}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TempScreen;
