<?php
namespace Drupal\ellison_webform\Plugin\WebformHandler;
 
use Drupal\Core\Annotation\Translation;
use Drupal\Core\Config\ConfigFactoryInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Logger\LoggerChannelFactoryInterface;
use Drupal\Core\Plugin\ContainerFactoryPluginInterface;
use Drupal\webform\Annotation\WebformHandler;
use Drupal\webform\Plugin\WebformHandler\EmailWebformHandler;
use Drupal\webform\Plugin\WebformHandlerBase;
use Drupal\webform\Plugin\WebformHandlerInterface;
use Drupal\webform\Plugin\WebformHandlerMessageInterface;
use Drupal\webform\WebformSubmissionConditionsValidatorInterface;
use Drupal\webform\WebformSubmissionInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Set region on session
 *
 * @WebformHandler(
 *   id = "call_tracking_metrics_handler",
 *   label = @Translation("Push form data to Call Tracking Metrics"),
 *   category = @Translation("Action"),
 *   description = @Translation("Pushes form data to Call Tracking Metrics."),
 *   cardinality = \Drupal\webform\Plugin\WebformHandlerInterface::CARDINALITY_UNLIMITED,
 *   results = \Drupal\webform\Plugin\WebformHandlerInterface::RESULTS_PROCESSED,
 *   submission = \Drupal\webform\Plugin\WebformHandlerInterface::SUBMISSION_REQUIRED,
 * )
 */
 
class CallTrackingMetricsHandler extends WebformHandlerBase {
 
  public function confirmForm(array &$form, FormStateInterface $form_state, WebformSubmissionInterface $webform_submission) {

    // In here, we perform our logic to manipulate and use the webform submission data however we want.
    // To access data from the webform submission, we call $webform_submission->getData(), we should be able to grab a part of the array that should be returned using a key.
    // The key will be the machine name of the field on the webform. 
    // So for example, if you have a field on the webform with a machine name of group, you code to get the value would be $webform_submission->getData()['group']
    
    $values = $webform_submission->getData();

    $url = 'https://api.calltrackingmetrics.com/api/v1/formreactor/FRT472ABB2C5B9B141ADAB06C7A709212DB922839F0589BD3C86E24F9356DEDDA29?key=6y0SQYZx6CgmOi9WOvjFX8FkMd7GEF3bWOi79GgXz8WZU_Qg';
    
    $headers = array(
      'Content-Type: application/x-www-form-urlencoded',
      'Cache-Control: no-cache',
      'Accept: */*',
    );

    $data = [
      'caller_name' => 'Web Handler',
      'country_code' => '1',
      'phone_number' => '(800) 555-5555',
      'email' => 'customer@example.com',
      'visitor_sid' => 'unique-ctm-visitor-id',
      'callback_number' => '+13332224444',
      'receiving_number' => '+8667372556',
      'edit-firstname' => $values['firstname'],
      'edit-lastname' => $values['lastname'],
      'edit-company' => $values['company'],
      'edit-title' => $values['title'],
      'edit-street' => $values['street'],
      //'edit-city' => $values['city'],
      'edit-state' => $values['state'],
      'edit-postalcode' => $values['postalcode']
    ];

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);

    $data_url_encoded_query = http_build_query($data);
    //$data_json = json_encode($data);
    
    curl_setopt($ch, CURLOPT_POSTFIELDS, $data_url_encoded_query);

    $response = curl_exec($ch);
    if (curl_errno($ch)) {
      \Drupal::logger('ellison_webform')->error('The error message from CTM is: ' . curl_error($ch));
    } else {
      \Drupal::logger('ellison_webform')->info('The response message from CTM is: ' . $response.text);
    }
    curl_close($ch);

    

    /*
    if (!empty($values['region'])) {
      // get term id
      $region_id = $values['region'];
      // get term name
      $region = \Drupal\taxonomy\Entity\Term::load($region_id)->get('name')->value;
      // get sssion
      $session = \Drupal::request()->getSession();
      // add region value to session
      $session->set('region', $region);
      $session->set('region_id', $region_id);
      // get region value from session and send to logger
      $session_region = $session->get('region');
      \Drupal::logger('ellison_webform')->info('The region "' . $session_region . ' (#' . $region_id . ')" added to session successfully.');
    
    }
    */
  
  }

}