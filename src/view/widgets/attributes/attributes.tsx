import Attribute from '../../../models/attribute';
import './attribute.css';

function AttributeWidget(props: { attribute?: Attribute }) {
    const { attribute } = props;

    return (
        <div className="attribute">
            {
                attribute !== undefined ?
                    <>
                        <span className='attribute-title'>{attribute.type}</span>
                        <span className='attribute-body'>
                            {
                                attribute.value.split('-').map((val) => val + " ")
                            }
                        </span>
                    </>
                    : null
            }
        </div>
    );
}

export default function AttributesWidget(props: { attributes?: Attribute[] }) {
    const { attributes } = props;

    return (
        <div className="attributes">
            {
                attributes !== undefined
                    ? attributes.map((attribute) => <AttributeWidget
                        attribute={attribute}
                        key={attribute.type}
                    />)
                    : null
            }
        </div>
    );
}