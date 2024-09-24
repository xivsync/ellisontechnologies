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

    // get webform id (varies by form instance)
    $webform_id_raw= $form['form_id']['#value'];

    \Drupal::logger('ellison_webform')->info('Starting to handle Call Tracking Metrics for ' . $webform_id_raw);

    // check the start of the form id to determine which form is being submitted
    if (str_starts_with($webform_id_raw, 'webform_submission_contact')) {
      $webform_id = 'webform_submission_contact';
    } elseif (str_starts_with($webform_id_raw, 'webform_submission_build_a_quote')) {
      $webform_id = 'webform_submission_build_a_quote';
    } else {
      return;
    }

    // Build A Quote Form
    $id_baq = 'FRT472ABB2C5B9B141ADAB06C7A709212DB5B0EF60229D38F02D4C00D8145FDA58D';
    $key_baq = 'VLhTUhvwsNBljzFmnVX5bui0GD-PaYcjHGPESzPwHQpCqWeY';
    $callback_number_baq = urlencode('+13332224444');
    $receiving_number_baq = urlencode('+18009940146'); // 18667860219 see BAQ Sales Quote tracking number in CTM

    // Contact Us Form
    $id_contact_us = 'FRT472ABB2C5B9B141ADAB06C7A709212DB922839F0589BD3C86E24F9356DEDDA29';
    $key_contact_us = '6y0SQYZx6CgmOi9WOvjFX8FkMd7GEF3bWOi79GgXz8WZU_Qg';
    $callback_number_contact_us = urlencode('+13332224444');
    $receiving_number_contact_us = urlencode('+18009940146'); // service recieving number in CTM
    
    /** 
     * 
     * Assign Call Tracking Metric API values
     *  
     * Callback number seems to have no use
     * Recieving number is found in CTM > Numbers > Tracking Numbers
     * 
    */
    switch ($webform_id) {
      case 'webform_submission_build_a_quote':
        $ID = $id_baq;
        $KEY = $key_baq;
        $CALLBACK_NUMBER = $callback_number_baq;
        $RECEIVING_NUMBER =$receiving_number_baq;
        break;
      case 'webform_submission_contact':
        $ID = $id_contact_us;
        $KEY = $key_contact_us;
        $CALLBACK_NUMBER = $callback_number_contact_us;
        $RECEIVING_NUMBER = $receiving_number_contact_us;
        break;
      default:
        return;
    }
    
    $values = $webform_submission->getData();
    
    /** 
     * 
     * Get field values from webform submission
     *  
     * Keep all common field names the same on all webforms
     * For example use firstname not first_name
     * 
    */
    $firstname = array_key_exists('firstname', $values) ? urlencode($values['firstname']) : '';
    $lastname = array_key_exists('lastname', $values) ? urlencode($values['lastname']) : '';
    if ($firstname!=='' && $lastname!=='') {
      $name = urlencode($values['firstname'] . ' ' . $values['lastname']);
    } else {
      $name = '';
    }
    $phone = array_key_exists('phone', $values) ? urlencode($values['phone']) : '';
    $email = array_key_exists('email', $values) ? urlencode($values['email']) : '';
    $title = array_key_exists('title', $values) ? urlencode($values['title']) : '';
    $company = array_key_exists('company', $values) ? urlencode($values['company']) : '';
    $street = array_key_exists('street', $values) ? urlencode($values['street']) : '';
    $city = array_key_exists('city', $values) ? urlencode($values['city']) : '';
    $state = array_key_exists('state', $values) ? urlencode($values['state']) : '';
    $postalcode = array_key_exists('postalcode', $values) ? urlencode($values['postalcode']) : '';

    // Additional customer fields
    $leads_interest__c = array_key_exists('leads_interest__c', $values) ? urlencode($values['leads_interest__c']) : '';
    $how_did_you_hear__c = array_key_exists('how_did_you_hear__c', $values) ? urlencode($values['how_did_you_hear__c']) : '';
    $webform_best_time__c = array_key_exists('webform_best_time__c', $values) ? urlencode($values['webform_best_time__c']) : '';
    $industry = array_key_exists('industry', $values) ? urlencode($values['industry']) : '';
    $select_location = array_key_exists('select_location', $values) ? urlencode($values['select_location']) : '';
    $description = array_key_exists('description', $values) ? urlencode($values['description']) : '';
    $opt_in = array_key_exists('opt_in', $values) ? urlencode($values['opt_in']) : '';
    $region__c = array_key_exists('region__c', $values) ? urlencode($values['region__c']) : '';
    $leadsource = array_key_exists('leadsource', $values) ? urlencode($values['leadsource']) : '';
    $webform_email_sign_up__c = array_key_exists('webform_email_sign_up__c', $values) ? urlencode($values['webform_email_sign_up__c']) : '';
    $builder_interest__c = array_key_exists('builder_interest__c', $values) ? urlencode($values['builder_interest__c']) : '';
    $webform_name__c = array_key_exists('webform_name__c', $values) ? urlencode($values['webform_name__c']) : '';
    $webform_campaign_id__c = array_key_exists('webform_campaign_id__c', $values) ? urlencode($values['webform_campaign_id__c']) : '';
    $opt_in = array_key_exists('opt_in', $values) ? urlencode($values['opt_in']) : '';

    /** 
     * 
     *  Build the payload
     *  
     *  Find the custom field names in CTM > Flows > Forms > Edit
     *  Prefix field names with custom_ and keep hyphens in the CTM field name
     *  Required CTM fields are caller_name, country_code, phone_number, email, visitor_sid, callback_number, receiving_number
     * 
    */
    switch ($webform_id) {
      case 'webform_submission_build_a_quote':
        $post_fields = "caller_name={$name}
          &country_code=1
          &phone_number={$phone}
          &email={$email}
          &visitor_sid=unique-ctm-visitor-id
          &callback_number={$CALLBACK_NUMBER}
          &receiving_number={$RECEIVING_NUMBER}
          &custom_firstName={$firstname}
          &custom_lastName={$lastname}
          &custom_email={$email}
          &custom_company={$company}
          &custom_street={$street}
          &custom_city={$city}
          &custom_state={$state}
          &custom_zipCode={$postalcode}
          &custom_notes={$description}
        ";
        break;
      case 'webform_submission_contact':
        $post_fields = "caller_name={$name}
          &country_code=1
          &phone_number={$phone}
          &email={$email}
          &visitor_sid=unique-ctm-visitor-id
          &callback_number={$CALLBACK_NUMBER}
          &receiving_number={$RECEIVING_NUMBER}
          &custom_edit-submitted-firstname={$firstname}
          &custom_edit-submitted-lastname={$lastname}
          &custom_edit-submitted-email={$email}
          &custom_edit-submitted-title={$title}
          &custom_edit-submitted-company={$company}
          &custom_edit-submitted-street={$street}
          &custom_edit-submitted-city={$city}
          &custom_edit-submitted-state={$state}
          &custom_edit-submitted-postalcode={$postalcode}
          &custom_edit-submitted-leads-interest-c={$leads_interest__c}
          &custom_edit-submitted-how-did-you-hear-c={$how_did_you_hear__c}
          &custom_edit-submitted-webform-best-time-c={$webform_best_time__c}
          &custom_edit-submitted-industry={$industry}
          &custom_edit-submitted-leadsource={$leadsource}
          &custom_select_location={$select_location}
          &custom_edit-submitted-description={$description}
          &custom_edit-submitted-opt_in={$opt_in}
          &custom_edit-submitted-region__c={$region__c}
          &custom_edit-submitted-webform_email_sign_up__c={$webform_email_sign_up__c}
          &custom_edit-submitted-builder-interest-c={$builder_interest__c}
          &custom_edit-submitted-webform-name-c={$webform_name__c}
          &custom_edit-submitted-submitted-webform_campaign_id__c={$webform_campaign_id__c}
        ";
        break;
      default:
        return;
    }
      
    $url = "https://api.calltrackingmetrics.com/api/v1/formreactor/{$ID}?key={$KEY}";
    \Drupal::logger('ellison_webform')->info('The Call Tracking Metrics endpoint for ' . $webform_id. ' is $url = ' . $url);
    
    $post_fields = preg_replace("/\r|\n/", "", $post_fields);
    \Drupal::logger('ellison_webform')->info('The payload posted to Call Tracking Metrics for ' . $webform_id. ' is $post_fields = ' . $post_fields);

    $curl = curl_init();  

    curl_setopt_array($curl, array(
      CURLOPT_URL => $url,
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => '',
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 0,
      CURLOPT_FOLLOWLOCATION => true,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => 'POST',
      CURLOPT_POSTFIELDS => $post_fields,
      CURLOPT_HTTPHEADER => array(
        'Content-Type: application/x-www-form-urlencoded'
      ),
    ));
    
    $response = curl_exec($curl);
    curl_close($curl);
    \Drupal::logger('ellison_webform')->info('The response from Call Tracking Metrics for ' . $webform_id. ' is $reponse = ' . print_r(serialize($response), TRUE));

  }

}