import React, { useState } from 'react';
import { View } from 'react-native';
import {
  Card,
  Title,
  Paragraph,
  Text,
  Portal,
  Dialog,
  TouchableRipple
} from 'react-native-paper';

import styles from './styles';
import { GlobalStyle, Button } from '../../components';
import Fade from '../../components/Fade';
// import ImageView from 'react-native-image-view';
import ImageView from 'react-native-image-zoom-viewer';
import messages from './messages';
import { FormattedMessage } from 'react-intl';
import Modal from '../../components/Modal';

const Notification = ({ data, onPress, onDelete }: any) => {
  const [state, setState] = useState({
    visible: false,
    loading: false,
    fadeVisible: true,
    imageIndex: 0,
    isImageViewVisible: false
  });

  const _showDialog = () => setState({ ...state, visible: true });
  const _hideDialog = () => setState({ ...state, visible: false });

  return (
    <Fade visible={state.fadeVisible}>
      <Card
        onPress={() => onPress(data)}
        style={[GlobalStyle.marginBottom10, { marginHorizontal: 10 }]}
      >
        {data.image_url != '' ? (
          <>
            <TouchableRipple
              onPress={() => {
                setState({
                  ...state,
                  imageIndex: 0,
                  isImageViewVisible: true
                });
              }}
            >
              <Card.Cover source={{ uri: data.image_url }} />
            </TouchableRipple>
            <Modal visible={state.isImageViewVisible} transparent={true}>
              <ImageView
                // glideAlways
                imageUrls={[
                  {
                    url: data.image_url

                    // width: "100%",
                    // height: "100%"
                  }
                ]}
                // imageIndex={state.imageIndex}
                // animationType='fade'
                // isVisible={state.isImageViewVisible}
                // // renderFooter={this.renderFooter}
                // onClose={() => setState({ ...state, isImageViewVisible: false })}
                onCancel={() =>
                  setState({ ...state, isImageViewVisible: false })
                }
                enableSwipeDown={true}
              />
            </Modal>
          </>
        ) : null}
        <Card.Content>
          <Title>{data.title}</Title>
          <Paragraph>{data.description}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.action}>
          <View
            style={{ justifyContent: 'flex-start', flex: 1, marginLeft: 10 }}
          >
            <Text style={{ textAlign: 'left', color: 'gray' }}>
              {data.created_at}
            </Text>
          </View>

          <Button
            loading={state.loading}
            disabled={state.loading}
            contentStyle={{ width: 'auto', height: 'auto' }}
            onPress={_showDialog}
            // onPress={() => onDelete(data.notification_id)}
          >
            <FormattedMessage {...messages.hide} />
          </Button>
        </Card.Actions>
      </Card>
      <Portal>
        <Dialog visible={state.visible} onDismiss={_hideDialog}>
          <Dialog.Content>
            <Paragraph>
              <FormattedMessage {...messages.sureToDelete} />
            </Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button mode='text' onPress={_hideDialog}>
              <FormattedMessage {...messages.cancel} />
            </Button>
            <Button
              mode='text'
              onPress={() => {
                setState({
                  ...state,
                  visible: false,
                  loading: true,
                  fadeVisible: false
                });
                onDelete(data.notification_id);
              }}
            >
              <FormattedMessage {...messages.confirm} />
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </Fade>
  );
};

export default Notification;
