import React, {useState} from 'react';
import {
  Text,
  Platform,
  KeyboardAvoidingView,
  SafeAreaView,
  ScrollView,
  Linking,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {actions, RichEditor, RichToolbar} from 'react-native-pell-rich-editor';
import ImagePicker from 'react-native-image-crop-picker';
import ImgToBase64 from 'react-native-image-base64';

const TempScreen = () => {
  const richText = React.useRef();
  const scrollRef = React.useRef();
  const [facebookShareURL, setFacebookShareURL] = useState(
    'https://facebook.com/sonsieg',
  );
  const [postContent, setPostContent] = useState('');
  const postOnFacebook = () => {
    let facebookParameters = [];
    if (facebookShareURL)
      facebookParameters.push('u=' + encodeURI(facebookShareURL));

    const url =
      'https://www.facebook.com/sharer/sharer.php?' +
      facebookParameters.join('&');
    console.log('url', url);
    Linking.openURL(url)
      .then(data => {
        alert('Facebook Opened');
      })
      .catch(() => {
        alert('Something went wrong');
      });
  };

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
          <TextInput
            value={postContent}
            onChangeText={postContent => setPostContent(postContent)}
            placeholder={'Enter Facebook Post Content'}
            style={styles.textInput}
          />
          <TextInput
            value={facebookShareURL}
            onChangeText={facebookShareURL =>
              setFacebookShareURL(facebookShareURL)
            }
            placeholder={'Enter URL to Share'}
            style={styles.textInput}
          />
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.buttonStyle}
            onPress={postOnFacebook}>
            <Text style={styles.buttonTextStyle}>Share on Facebook</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TempScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
    textAlign: 'center',
  },
  titleText: {
    fontSize: 22,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  titleTextsmall: {
    marginVertical: 8,
    fontSize: 16,
  },
  buttonStyle: {
    justifyContent: 'center',
    marginTop: 15,
    padding: 10,
    backgroundColor: '#8ad24e',
    marginRight: 2,
    marginLeft: 2,
  },
  buttonTextStyle: {
    color: '#fff',
    textAlign: 'center',
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '100%',
    paddingHorizontal: 10,
  },
});
